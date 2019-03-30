import { Component, OnInit, ViewChild, Renderer2, ViewChildren, QueryList, AfterViewInit, Input, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, ValidatorFn } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PageOrientation, PageSize, BuilderControl } from './ng-ticket-builder.models';

enum ArrowAction {
  Up = "ArrowUp",
  Left = "ArrowLeft",
  Right = "ArrowRight",
  Down = "ArrowDown"
}

enum Tabs {
  Core = "Core",
  Typography = "Typography",
  Blocks = "Blocks",
  Layers = "Layers"
}

enum DefaultBlocks {
  QrCode = "qrcode"
}

const DEFAULT_BLOCKS_HTML = {
  qrcode: {
    selector: 'img',
    attributes: [
      {
        name: 'src',
        value: '/assets/images/qr_code_image_placeholder.png'
      }
    ],
    initialStyles: [
      {
        name: 'height',
        value: '200px'
      },
      {
        name: 'width',
        value: '200px'
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
  @ViewChild('builderCanvas') builderCanvas: any;
  @ViewChildren('sizeAction') sizeActions: QueryList<any>;
  @Input() initialHtml?: string = '';
  @Input() controls?: BuilderControl[] = [];

  private _canvas: any;
  private _focusedElement: any;
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

  constructor(
    private renderer2: Renderer2,
    private formBuilder: FormBuilder) {
      this.coreForm = this.formBuilder.group({
        dynamicControls: this.formBuilder.array([])
      });
    }

  ngOnInit() {
    this._canvas = this.builderCanvas.nativeElement;
    this._initialize();
    this._initializeNavigation();
    this._initializeCoreForm();
  }

  ngOnDestroy() {
    window.removeEventListener('keydown', this._handleArrowMovement);
    this._subs.forEach(sub => sub.unsubscribe());
  }

  ngAfterViewInit() {
    this.sizeActions.forEach(action => {
      const nativeElement = action.nativeElement;
      if (nativeElement.dataset.size !== this.currentSize) return;

      this.renderer2.addClass(nativeElement, 'active');
    });
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

  getCoreControlGroup(groupName: number) {
    return this.coreForm.controls['dynamicControls'].get(groupName.toString());
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
    this.renderer2.setStyle(element, 'box-sizing', 'border-box');
    this.renderer2.setStyle(element, 'cursor', 'grab');

    this.renderer2.listen(element, 'mouseover', () => {
      this.renderer2.setStyle(element, 'box-shadow', '0px 0px 0px 3px rgba(149,177,225,1)');
    });

    this.renderer2.listen(element, 'mouseout', () => {
      this.renderer2.setStyle(element, 'box-shadow', 'none');
    });

    this.renderer2.listen(window, 'mousedown', () => this._focusedElement = element);
    this.renderer2.appendChild(this._canvas, element);
    this._focusedElement = element;
  }

  private _initialize() {
    this.currentSize = PageSize.A5;
    this.currentOrientation = PageOrientation.Vertical;
    this.renderer2.setStyle(this._canvas, 'background-color', '#fff');
    this.renderer2.setStyle(this._canvas, 'width', `${PAGE_SIZES[this.currentSize].width}px`);
    this.renderer2.setStyle(this._canvas, 'height', `${PAGE_SIZES[this.currentSize].height}px`);
    window.addEventListener('keydown', this._handleArrowMovement.bind(this));
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

  private _createInput(name: string, validators: ValidatorFn[]): FormGroup {
    const group = this.formBuilder.group({});
    group.addControl(name, new FormControl('', validators));
    return group;
  }

  private _handleArrowMovement(e) {
    if (!this._focusedElement) return;
      
    const currentY = this._focusedElement.style.top.replace('px', '') << 0;
    const currentX = this._focusedElement.style.left.replace('px', '') << 0;

    if (e.code === ArrowAction.Up) {
      return this._focusedElement.style.top = `${currentY - 1}px`;
    }

    if (e.code === ArrowAction.Down) {
      return this._focusedElement.style.top = `${currentY + 1}px`;
    }

    if (e.code === ArrowAction.Left) {
      return this._focusedElement.style.left = `${currentX - 1}px`;
    }

    if (e.code === ArrowAction.Right) {
      return this._focusedElement.style.left = `${currentX + 1}px`;
    }
  }

}
