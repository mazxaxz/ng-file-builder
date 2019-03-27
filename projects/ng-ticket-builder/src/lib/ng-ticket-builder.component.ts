import { Component, OnInit, ViewChild, Renderer2, ViewChildren, QueryList, AfterViewInit, Input, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PageOrientation, PageSize } from './ng-ticket-builder.models';

enum Tabs {
  Core = "Core",
  Typography = "Typography",
  Blocks = "Blocks"
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
  private _canvas: any;
  navigationForm: FormGroup;

  currentSize: PageSize;
  currentOrientation: PageOrientation;
  currentTab: Tabs = Tabs.Core;

  PageSize = PageSize;
  PageOrientation = PageOrientation;
  Tabs = Tabs;

  constructor(private renderer2: Renderer2) { }

  ngOnInit() {
    this._canvas = this.builderCanvas.nativeElement;
    this._initialize();
    this._initializeNavigation();
  }

  ngOnDestroy() {
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

  private _initialize() {
    this.currentSize = PageSize.A5;
    this.currentOrientation = PageOrientation.Vertical;
    this.renderer2.setStyle(this._canvas, 'background-color', '#fff');
    this.renderer2.setStyle(this._canvas, 'width', `${PAGE_SIZES[this.currentSize].width}px`);
    this.renderer2.setStyle(this._canvas, 'height', `${PAGE_SIZES[this.currentSize].height}px`);
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

}
