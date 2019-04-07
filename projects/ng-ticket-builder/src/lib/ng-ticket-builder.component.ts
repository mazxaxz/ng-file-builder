import { Component, OnInit, ViewChild, Renderer2, ViewChildren, QueryList, AfterViewInit, Input, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, ValidatorFn } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PageOrientation, PageSize, BuilderControl, DefaultBlocks } from './ng-ticket-builder.models';
import { NgTicketBuilderService } from './ng-ticket-builder.service';

enum ArrowAction {
  Up = "ArrowUp",
  Left = "ArrowLeft",
  Right = "ArrowRight",
  Down = "ArrowDown"
}

interface NavigationTab {
  icon: string;
  value: Tabs;
}

enum Tabs {
  Core = "Core",
  Typography = "Typography",
  Blocks = "Blocks",
  Layers = "Layers"
}

const QR_CODE_SRC_PLACEHOLDER = '/assets/images/qr_code_image_placeholder.png';

const DEFAULT_BLOCKS_HTML = {
  qrcode: {
    selector: 'div',
    attributes: [],
    enumDecorator: DefaultBlocks.QrCode,
    icon: 'layers',
    label: 'QR Code',
    initialStyles: [
      {
        name: 'height',
        value: '200px'
      },
      {
        name: 'width',
        value: '200px'
      },
      {
        name: 'background-image',
        value: `url('${QR_CODE_SRC_PLACEHOLDER}')`
      },
      {
        name: 'background-size',
        value: 'contain'
      },
      {
        name: 'background-repeat',
        value: 'no-repeat'
      }
    ]
  },
  square: {
    selector: 'div',
    attributes: [],
    enumDecorator: DefaultBlocks.Square,
    icon: 'stop',
    label: 'Square',
    initialStyles: [
      {
        name: 'height',
        value: '100px'
      },
      {
        name: 'width',
        value: '100px'
      },
      {
        name: 'background-color',
        value: '#504280'
      }
    ]
  }
}

const PAGE_SIZES = {
  A7: { width: 210, height: 298, scale: 2.02 },
  A6: { width: 298, height: 420, scale: 1.42 },
  A5: { width: 420, height: 595, scale: 1 },
  A4: { width: 595, height: 842, scale: 0.7 }
}

@Component({
  selector: 'mzx-ng-ticket-builder',
  templateUrl: './ng-ticket-builder.component.html',
  styleUrls: ['./ng-ticket-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgTicketBuilderComponent implements OnInit, OnDestroy, AfterViewInit {
  private _subs: Subscription[] = [];
  private _listeners: Function[] = [];
  @ViewChild('builderCanvas') builderCanvas: any;
  @ViewChildren('sizeAction') sizeActions: QueryList<any>;
  @Input() initialHtml?: string = '';
  @Input() controls?: BuilderControl[] = [];

  private _canvas: any;
  private _currentMouseX: number;
  private _currentMouseY: number;

  private _currentDrag = { x: 0, y: 0 };

  private _resizeBindingFnc: any;
  private _dragBindingFnc: any;

  navigationForm: FormGroup;
  coreForm: FormGroup;
  coreFormFields: FormArray;

  currentSize: PageSize;
  currentOrientation: PageOrientation;
  currentTab: Tabs = Tabs.Core;

  PageSize = PageSize;
  PageOrientation = PageOrientation;
  Tabs = Tabs;
  DefaultBlocks = DefaultBlocks;

  navigationTabs: NavigationTab[];

  constructor(
    private ticketBuilderService: NgTicketBuilderService,
    private renderer2: Renderer2,
    private formBuilder: FormBuilder) {
      this.coreForm = this.formBuilder.group({
        dynamicControls: this.formBuilder.array([])
      });

      this.navigationTabs = [
        { icon: 'business', value: Tabs.Core },
        { icon: 'text_fields', value: Tabs.Typography },
        { icon: 'view_module', value: Tabs.Blocks },
        { icon: 'layers', value: Tabs.Layers }
      ];
    }

  ngOnInit() {
    this._canvas = this.builderCanvas.nativeElement;
    this._initialize();
    this._initializeNavigation();
    this._initializeCoreForm();
    this._initializeHighlight();
    this._initializeFocus();
  }

  ngOnDestroy() {
    window.removeEventListener('keydown', this._handleArrowMovement);
    this._subs.forEach(sub => sub.unsubscribe());
    this._listeners.forEach(fn => fn());
  }

  ngAfterViewInit() {
    this.sizeActions.forEach(action => {
      const nativeElement = action.nativeElement;
      if (nativeElement.dataset.size !== this.currentSize) return;

      this.renderer2.addClass(nativeElement, 'active');
    });

    if (!this.initialHtml) return;

    for (let i = 0; i < this._canvas.children.length; i++) {
      this._addListeners(this._canvas.children[i]);
      this.renderer2.setStyle(this._canvas.children[i], 'user-select', 'none');

      if (this._canvas.children[i].style.zIndex.length <= 0) {
        this.renderer2.setStyle(this._canvas.children[i], 'z-index', i);
      }
      this.ticketBuilderService.addElement(this._canvas.children[i])
    }

    this.ticketBuilderService.sortByZIndex();
  }

  changeOrientation() {
    const width = this._canvas.style.width;
    const height = this._canvas.style.height;
    this.renderer2.setStyle(this._canvas, 'width', height);
    this.renderer2.setStyle(this._canvas, 'height', width);

    if (this.currentOrientation === PageOrientation.Horizontal) {
      return this.currentOrientation = PageOrientation.Vertical;
    }

    this.currentOrientation = PageOrientation.Horizontal;
  }

  setSize(size: PageSize) {
    this.currentSize = size;
    const width = `${PAGE_SIZES[size].width}px`;
    const height = `${PAGE_SIZES[size].height}px`;
    this.renderer2.setStyle(this._canvas, 'transform', `scale(${PAGE_SIZES[size].scale})`);
    if (this.currentOrientation === PageOrientation.Vertical) {
      this.renderer2.setStyle(this._canvas, 'width', width);
      this.renderer2.setStyle(this._canvas, 'height', height);
    } else {
      this.renderer2.setStyle(this._canvas, 'width', height);
      this.renderer2.setStyle(this._canvas, 'height', width);
    }

    this.sizeActions.forEach(action => {
      const nativeElement = action.nativeElement;
      if (nativeElement.dataset.size === size) {
        return this.renderer2.addClass(nativeElement, 'active');
      }

      return this.renderer2.removeClass(nativeElement, 'active');
    });
  }

  renderElement(block: DefaultBlocks) {
    const selected = DEFAULT_BLOCKS_HTML[block];
    const element = this.renderer2.createElement(selected.selector);
    selected.attributes.forEach(attribute => {
      this.renderer2.setAttribute(element, attribute.name, attribute.value);
    });
    selected.initialStyles.forEach(style => {
      this.renderer2.setStyle(element, style.name, style.value);
    });

    const height = element.style.height.replace('px', '') << 0;
    const width = element.style.width.replace('px', '') << 0;
    const parentHeight = this._canvas.style.height.replace('px', '') << 0;
    const parentWidth = this._canvas.style.width.replace('px', '') << 0;

    this.renderer2.setStyle(element, 'position', 'absolute');
    this.renderer2.setStyle(element, 'top', `${(parentHeight / 2) - (height / 2)}px`);
    this.renderer2.setStyle(element, 'left', `${(parentWidth / 2) - (width / 2)}px`);
    this.renderer2.setStyle(element, 'cursor', 'auto');
    this.renderer2.setStyle(element, 'user-select', 'none');
    this.renderer2.setStyle(element, 'z-index', this.ticketBuilderService.getElements().length);

    this._addListeners(element);
    this.renderer2.appendChild(this._canvas, element);
    this.ticketBuilderService.addElement(element);
    this.ticketBuilderService.focusElement(element);
  }

  getDefaultBlocksAsArray() {
    return Object.keys(DEFAULT_BLOCKS_HTML).map(key => DEFAULT_BLOCKS_HTML[key]);
  }

  private _initialize() {
    this.currentSize = PageSize.A5;
    this.currentOrientation = PageOrientation.Vertical;
    this.renderer2.setStyle(this._canvas, 'background-color', '#fff');
    this.renderer2.setStyle(this._canvas, 'width', `${PAGE_SIZES[this.currentSize].width}px`);
    this.renderer2.setStyle(this._canvas, 'height', `${PAGE_SIZES[this.currentSize].height}px`);
    this.renderer2.setStyle(this._canvas, 'overflow', 'hidden');
    
    window.addEventListener('keydown', this._handleArrowMovement.bind(this));
  }

  private _addListeners(element) {
    const over = this.renderer2.listen(element, 'mouseover', () => {
      if (this.ticketBuilderService.focusedElement === element) return;

      this.renderer2.setStyle(element, 'outline', '3px solid rgba(149,177,225,1)');
    });

    const out = this.renderer2.listen(element, 'mouseout', () => {
      if (this.ticketBuilderService.focusedElement === element) return;

      this.renderer2.setStyle(element, 'outline', 'none');
    });

    const move = this.renderer2.listen(this._canvas, 'mousemove', (e) => {
      const computed = window.getComputedStyle(element);
      const height = +computed.getPropertyValue('height').replace('px', '');
      const width = +computed.getPropertyValue('width').replace('px', '');
      const borderSize = 10 / PAGE_SIZES[this.currentSize].scale;

      if (e.offsetY > (height - borderSize) && e.offsetY < (height + borderSize) &&
          e.offsetX > (width - borderSize) && e.offsetX < (width + borderSize)) {
        element.style.cursor = 'se-resize';
        this._canvas.style.cursor = 'se-resize';
        return;
      }
      
      element.style.cursor = 'grab';
      this._canvas.style.cursor = 'auto';
    });

    const down = this.renderer2.listen(element, 'mousedown', (e) => {
      this.ticketBuilderService.focusElement(element);
      this._canvas.removeEventListener('mousemove', this._resizeBindingFnc);
      this._canvas.removeEventListener('mousemove', this._dragBindingFnc);
      this.renderer2.setStyle(element, 'outline', '3px solid rgba(149,177,225,1)');

      const computed = window.getComputedStyle(element);
      const height = +computed.getPropertyValue('height').replace('px', '');
      const width = +computed.getPropertyValue('width').replace('px', '');
      const borderSize = 10 / PAGE_SIZES[this.currentSize].scale;

      this._currentMouseY = e.y;
      this._currentMouseX = e.x;

      if (e.offsetY > (height - borderSize) && e.offsetY < (height + borderSize) &&
          e.offsetX > (width - borderSize) && e.offsetX < (width + borderSize)) {
        this._resizeBindingFnc = this._resize.bind(this);
        this._canvas.addEventListener('mousemove', this._resizeBindingFnc);
        return;
      }

      this._dragBindingFnc = this._drag.bind(this);
      this._canvas.addEventListener('mousemove', this._dragBindingFnc);
    });

    const up = this.renderer2.listen(this._canvas, 'mouseup', () => {
      this._canvas.removeEventListener('mousemove', this._resizeBindingFnc);

      this._canvas.removeEventListener('mousemove', this._dragBindingFnc);
      if (this._currentDrag.x !== 0 || this._currentDrag.y !== 0) {
        const focused = this.ticketBuilderService.focusedElement;
        const computed = window.getComputedStyle(focused);
        const y = +computed.getPropertyValue('top').replace('px', '');
        const x = +computed.getPropertyValue('left').replace('px', '');

        this.renderer2.setStyle(focused, 'top', `${y + this._currentDrag.y}px`);
        this.renderer2.setStyle(focused, 'left', `${x + this._currentDrag.x}px`);
        this.renderer2.setStyle(focused, 'transform', 'none');
        [this._currentDrag.x, this._currentDrag.y] = [0, 0];
      }
    });
    this._listeners.push(over, out, move, down, up);
  }

  private _resize(event) {
    const focused = this.ticketBuilderService.focusedElement;
    const computed = window.getComputedStyle(focused);
    const dy = (this._currentMouseY - event.y) / PAGE_SIZES[this.currentSize].scale;
    const dx = (this._currentMouseX - event.x) / PAGE_SIZES[this.currentSize].scale;
    const height = +computed.getPropertyValue('height').replace('px', '');
    const width = +computed.getPropertyValue('width').replace('px', '');

    this._currentMouseY = event.y;
    this._currentMouseX = event.x;
    focused.style.height = (height - dy) + 'px';
    focused.style.width = (width - dx) + 'px';
  }

  private _drag(event) {
    const dy = (this._currentMouseY - event.y) / PAGE_SIZES[this.currentSize].scale;
    const dx = (this._currentMouseX - event.x) / PAGE_SIZES[this.currentSize].scale;
    this._currentMouseY = event.y;
    this._currentMouseX = event.x;

    const drag = { x: this._currentDrag.x - dx, y: this._currentDrag.y - dy };
    this.renderer2.setStyle(this.ticketBuilderService.focusedElement, 'transform', `translate3d(${drag.x}px, ${drag.y}px, 0px)`);
    [this._currentDrag.x, this._currentDrag.y] = [drag.x, drag.y];
  }

  private _initializeNavigation() {
    this.navigationForm = new FormGroup({
      currentTab: new FormControl(this.currentTab)
    });
    const sub = this.navigationForm.get('currentTab').valueChanges
      .subscribe((value: Tabs) => {
        if (!value) return;

        this.currentTab = value;
      });
    this._subs.push(sub);
  }

  private _initializeCoreForm() {
    if (!this.controls || this.controls.length <= 0) return;

    const items = this.coreForm.get('dynamicControls') as FormArray;
    this.controls.forEach((control: BuilderControl) => {
      items.push(this._createInput(control.name, control.validators));
    });
    this.coreFormFields = items;
  }

  private _initializeHighlight() {
    const highlightSub = this.ticketBuilderService.highlightedElement$
      .subscribe(element => {
        if (element === null || this.ticketBuilderService.focusedElement === element)
          return;

        this.renderer2.setStyle(element, 'outline', '2px dashed rgba(149,177,225,1)');
      });

    const disableHighlightSub = this.ticketBuilderService.disableHighlight$
      .subscribe(element => {
        if (element === null || this.ticketBuilderService.focusedElement === element)
          return;

        this.renderer2.setStyle(element, 'outline', 'none');
      });
    
    this._subs.push(highlightSub, disableHighlightSub);
  }

  private _initializeFocus() {
    const focusSub = this.ticketBuilderService.focusElement$
      .subscribe(element => {
        if (element === null) return;

        this.renderer2.setStyle(element, 'outline', '3px solid rgba(149,177,225,1)');
      });
    
    const disableFocusSub = this.ticketBuilderService.disableFocus$
      .subscribe(element => {
        if (element === null) return;

        this.renderer2.setStyle(element, 'outline', 'none');
      });

    this._subs.push(focusSub, disableFocusSub);
  }

  private _createInput(name: string, validators: ValidatorFn[]): FormGroup {
    const group = this.formBuilder.group({});
    group.addControl(name, new FormControl('', validators));
    return group;
  }

  private _handleArrowMovement(e) {
    const focused = this.ticketBuilderService.focusedElement;
    if (!focused) return;
      
    const currentY = focused.style.top.replace('px', '') << 0;
    const currentX = focused.style.left.replace('px', '') << 0;

    if (e.code === ArrowAction.Up) {
      return focused.style.top = `${currentY - 1}px`;
    }

    if (e.code === ArrowAction.Down) {
      return focused.style.top = `${currentY + 1}px`;
    }

    if (e.code === ArrowAction.Left) {
      return focused.style.left = `${currentX - 1}px`;
    }

    if (e.code === ArrowAction.Right) {
      return focused.style.left = `${currentX + 1}px`;
    }
  }

}
