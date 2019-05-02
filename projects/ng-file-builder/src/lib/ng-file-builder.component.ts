import { Component, OnInit, ViewChild, Renderer2, ViewChildren, QueryList, AfterViewInit, Input, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, ValidatorFn } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PageOrientation, PageSize, BuilderControl, DefaultBlocks, PageDensity } from './ng-file-builder.models';
import { NgFileBuilderService } from './services/ng-file-builder.service';
import { DEFAULT_BLOCKS_HTML, PAGE_SIZES } from './ng-file-builder.constants';
import { ModalService } from './services/modal.service';
import { InfoBoxComponent } from './components/modals/info-box/info-box.component';

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
  Blocks = "Blocks",
  Layers = "Layers",
  Options = "Options"
}

@Component({
  selector: 'mzx-file-builder',
  templateUrl: './ng-file-builder.component.html',
  styleUrls: ['./ng-file-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgFileBuilderComponent implements OnInit, OnDestroy, AfterViewInit {
  private _subs: Subscription[] = [];
  private _listeners: Function[] = [];
  @ViewChild('builderCanvas') builderCanvas: any;
  @ViewChildren('sizeAction') sizeActions: QueryList<any>;
  @Input() initialHtml?: string = '';
  @Input() controls?: BuilderControl[] = [];
  @Input() density?: PageDensity = PageDensity.PPI_72;
  @Input() initialSize?: PageSize = PageSize.A5;
  @Output() onSave: EventEmitter<any> = new EventEmitter<any>();

  private _canvas: any;
  private _currentMouseX: number;
  private _currentMouseY: number;

  private _currentDrag = { x: 0, y: 0 };

  private _resizeBindingFnc: any;
  private _dragBindingFnc: any;
  private _rotateBindingFnc: any;
  private _arrowMvmntFnc: any;

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
    private fileBuilderService: NgFileBuilderService,
    private modalService: ModalService,
    private renderer2: Renderer2,
    private formBuilder: FormBuilder,
    private ref: ChangeDetectorRef) {
      this.coreForm = this.formBuilder.group({
        dynamicControls: this.formBuilder.array([])
      });

      this.navigationTabs = [
        { icon: 'business', value: Tabs.Core },
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
    window.removeEventListener('keydown', this._arrowMvmntFnc);
    this._subs.forEach(sub => sub.unsubscribe());
    this._listeners.forEach(fn => fn());
  }

  ngAfterViewInit() {
    this.setSize(this.initialSize);
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
      this.fileBuilderService.addElement(this._canvas.children[i])
    }

    this.fileBuilderService.sortByZIndex();
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
    const width = `${PAGE_SIZES[this.density][size].width}px`;
    const height = `${PAGE_SIZES[this.density][size].height}px`;
    this.renderer2.setStyle(this._canvas, 'transform', `scale(${PAGE_SIZES[this.density][size].scale})`);
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

    if (selected.initialText) {
      element.innerText = selected.initialText;
    }
    
    const height = element.style.height.replace('px', '') << 0;
    const width = element.style.width.replace('px', '') << 0;
    const parentHeight = this._canvas.style.height.replace('px', '') << 0;
    const parentWidth = this._canvas.style.width.replace('px', '') << 0;

    this.renderer2.setStyle(element, 'position', 'absolute');
    this.renderer2.setStyle(element, 'top', `${(parentHeight / 2) - (height / 2)}px`);
    this.renderer2.setStyle(element, 'left', `${(parentWidth / 2) - (width / 2)}px`);
    this.renderer2.setStyle(element, 'cursor', 'auto');
    this.renderer2.setStyle(element, 'user-select', 'none');
    this.renderer2.setStyle(element, 'z-index', this.fileBuilderService.getElements().length);

    this._addListeners(element);
    this.renderer2.appendChild(this._canvas, element);
    this.fileBuilderService.addElement(element);
    this.fileBuilderService.focusElement(element);
  }

  getDefaultBlocksAsArray() {
    return Object.keys(DEFAULT_BLOCKS_HTML).map(key => DEFAULT_BLOCKS_HTML[key]);
  }

  saveTemplate() {
    this.onSave.emit("Save event");
  }

  showInfo() {
    this.modalService.open(InfoBoxComponent);
  }

  private _initialize() {
    this.currentSize = PageSize.A5;
    this.currentOrientation = PageOrientation.Vertical;
    this.renderer2.setStyle(this._canvas, 'background-color', '#fff');
    this.renderer2.setStyle(this._canvas, 'width', `${PAGE_SIZES[this.density][this.currentSize].width}px`);
    this.renderer2.setStyle(this._canvas, 'height', `${PAGE_SIZES[this.density][this.currentSize].height}px`);
    this.renderer2.setStyle(this._canvas, 'overflow', 'hidden');
    
    this._arrowMvmntFnc = this._handleArrowMovement.bind(this);
    window.addEventListener('keydown', this._arrowMvmntFnc);
  }

  private _addListeners(element) {
    const over = this.renderer2.listen(element, 'mouseover', () => {
      if (this.fileBuilderService.focusedElement === element) return;

      this.renderer2.setStyle(element, 'outline', '3px solid rgba(149,177,225,1)');
    });

    const out = this.renderer2.listen(element, 'mouseout', () => {
      if (this.fileBuilderService.focusedElement === element) return;

      this.renderer2.setStyle(element, 'outline', 'none');
    });

    const move = this.renderer2.listen(this._canvas, 'mousemove', (e) => {
      const computed = window.getComputedStyle(element);
      const height = +computed.getPropertyValue('height').replace('px', '');
      const width = +computed.getPropertyValue('width').replace('px', '');
      const borderSize = 10 / PAGE_SIZES[this.density][this.currentSize].scale;

      if (e.offsetY > (height - borderSize) && e.offsetY < (height + borderSize) &&
          e.offsetX > (width - borderSize) && e.offsetX < (width + borderSize)) {
        element.style.cursor = 'se-resize';
        this._canvas.style.cursor = 'se-resize';
        return;
      }

      if (e.offsetY < (height * 0.3) && ((width * 0.3) < e.offsetX && e.offsetX < (width * 0.6))) {
        element.style.cursor = 'cell';
        this._canvas.style.cursor = 'cell';
        return;
      }
      
      element.style.cursor = 'grab';
      this._canvas.style.cursor = 'auto';
    });

    const down = this.renderer2.listen(element, 'mousedown', (e) => {
      e.preventDefault();
      this.fileBuilderService.focusElement(element);
      this._canvas.removeEventListener('mousemove', this._resizeBindingFnc);
      this._canvas.removeEventListener('mousemove', this._dragBindingFnc);
      this.renderer2.setStyle(element, 'outline', '3px solid rgba(149,177,225,1)');

      const computed = window.getComputedStyle(element);
      const height = +computed.getPropertyValue('height').replace('px', '');
      const width = +computed.getPropertyValue('width').replace('px', '');
      const borderSize = 10 / PAGE_SIZES[this.density][this.currentSize].scale;

      this._currentMouseY = e.y;
      this._currentMouseX = e.x;

      if (e.offsetY > (height - borderSize) && e.offsetY < (height + borderSize) &&
          e.offsetX > (width - borderSize) && e.offsetX < (width + borderSize)) {
        this._resizeBindingFnc = this._resize.bind(this);
        this._canvas.addEventListener('mousemove', this._resizeBindingFnc);
        return;
      }

      if (e.offsetY < (height * 0.3) && ((width * 0.3) < e.offsetX && e.offsetX < (width * 0.6))) {
        this._rotateBindingFnc = this._rotate.bind(this);
        this._canvas.addEventListener('mousemove', this._rotateBindingFnc);
        return;
      }

      this._dragBindingFnc = this._drag.bind(this);
      this._canvas.addEventListener('mousemove', this._dragBindingFnc);
    });

    const up = this.renderer2.listen(this._canvas, 'mouseup', () => {
      this._canvas.removeEventListener('mousemove', this._resizeBindingFnc);
      this._canvas.removeEventListener('mousemove', this._rotateBindingFnc);

      this._canvas.removeEventListener('mousemove', this._dragBindingFnc);
      if (this._currentDrag.x !== 0 || this._currentDrag.y !== 0) {
        const focused = this.fileBuilderService.focusedElement;
        const computed = window.getComputedStyle(focused);
        const y = +computed.getPropertyValue('top').replace('px', '');
        const x = +computed.getPropertyValue('left').replace('px', '');
        const rotation = focused.dataset.rotation ? `rotate(${focused.dataset.rotation})` : '';

        this.renderer2.setStyle(focused, 'top', `${y + this._currentDrag.y}px`);
        this.renderer2.setStyle(focused, 'left', `${x + this._currentDrag.x}px`);
        this.renderer2.setStyle(focused, 'transform', rotation);
        [this._currentDrag.x, this._currentDrag.y] = [0, 0];
      }
    });
    this._listeners.push(over, out, move, down, up);
  }

  private _resize(event) {
    const focused = this.fileBuilderService.focusedElement;
    const computed = window.getComputedStyle(focused);
    const dy = (this._currentMouseY - event.y) / PAGE_SIZES[this.density][this.currentSize].scale;
    const dx = (this._currentMouseX - event.x) / PAGE_SIZES[this.density][this.currentSize].scale;
    const height = +computed.getPropertyValue('height').replace('px', '');
    const width = +computed.getPropertyValue('width').replace('px', '');

    this._currentMouseY = event.y;
    this._currentMouseX = event.x;
    focused.style.height = (height - dy) + 'px';
    focused.style.width = (width - dx) + 'px';
  }

  private _rotate(event) {
    const dy = (this._currentMouseY - event.y);
    const dx = (this._currentMouseX - event.x);
    this._currentMouseY = event.y;
    this._currentMouseX = event.x;

    const radians = Math.atan2(dx - this._currentMouseX, dy - this._currentMouseY);
    const degree = (((radians * (180 / Math.PI) * -1) - 120) * 4) % 360;

    this.fileBuilderService.focusedElement.setAttribute('data-rotation', degree + 'deg');
    this.renderer2.setStyle(this.fileBuilderService.focusedElement, 'transform', `rotate(${degree}deg)`);
  }

  private _drag(event) {
    let dy = (this._currentMouseY - event.y) / PAGE_SIZES[this.density][this.currentSize].scale;
    let dx = (this._currentMouseX - event.x) / PAGE_SIZES[this.density][this.currentSize].scale;
    this._currentMouseY = event.y;
    this._currentMouseX = event.x;
    const focused = this.fileBuilderService.focusedElement;

    const drag = { x: this._currentDrag.x - dx, y: this._currentDrag.y - dy };
    [this._currentDrag.x, this._currentDrag.y] = [drag.x, drag.y];

    const rotation = focused.dataset.rotation ? `rotate(${focused.dataset.rotation})` : '';
    this.renderer2.setStyle(focused, 'transform', `translate3d(${drag.x}px, ${drag.y}px, 0px) ${rotation}`);    
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
    const highlightSub = this.fileBuilderService.highlightedElement$
      .subscribe(element => {
        if (element === null || this.fileBuilderService.focusedElement === element)
          return;

        this.renderer2.setStyle(element, 'outline', '2px dashed rgba(149,177,225,1)');
      });

    const disableHighlightSub = this.fileBuilderService.disableHighlight$
      .subscribe(element => {
        if (element === null || this.fileBuilderService.focusedElement === element)
          return;

        this.renderer2.setStyle(element, 'outline', 'none');
      });
    
    this._subs.push(highlightSub, disableHighlightSub);
  }

  private _initializeFocus() {
    const focusSub = this.fileBuilderService.focusElement$
      .subscribe(element => {
        if (element === null) return;

        this.renderer2.setStyle(element, 'outline', '3px solid rgba(149,177,225,1)');
        this.navigationForm.get('currentTab').setValue(Tabs.Options);
        this.ref.detectChanges();
      });
    
    const disableFocusSub = this.fileBuilderService.disableFocus$
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
    const focused = this.fileBuilderService.focusedElement;
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
