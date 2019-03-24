import { Component, OnInit, ViewChild, Renderer2, ViewChildren, QueryList, AfterViewInit } from '@angular/core';

enum Size {
  A5 = "A5",
  A4 = "A4",
  A3 = "A3"
}

enum Orientation {
  Horizontal = "horizontal",
  Vertical = "vertical"
}

const PAGE_SIZES = {
  A5: { width: 420, height: 595 },
  A4: { width: 595, height: 842 },
  A3: { width: 842, height: 1191 }
}

@Component({
  selector: 'mzx-ng-ticket-builder',
  templateUrl: './ng-ticket-builder.component.html',
  styleUrls: ['./ng-ticket-builder.component.scss']
})
export class NgTicketBuilderComponent implements OnInit, AfterViewInit {
  @ViewChild('builderCanvas') builderCanvas: any;
  @ViewChildren('sizeAction') sizeActions: QueryList<any>;
  private _canvas: any;
  currentSize: Size;
  currentOrientation: Orientation;

  Size = Size;
  Orientation = Orientation;

  constructor(private renderer2: Renderer2) { }

  ngOnInit() {
    this._canvas = this.builderCanvas.nativeElement;
    this._initialize();
  }

  ngAfterViewInit() {
    this.sizeActions.forEach(action => {
      const nativeElement = action.nativeElement;
      if (nativeElement.dataset.size !== this.currentSize) return;

      this.renderer2.addClass(nativeElement, 'active');
    });

    this.onWindowResize();
  }

  changeOrientation() {
    const width = this._canvas.style.width;
    const height = this._canvas.style.height;
    this.renderer2.setStyle(this._canvas, 'width', height);
    this.renderer2.setStyle(this._canvas, 'height', width);
    this.onWindowResize();

    if (this.currentOrientation === Orientation.Horizontal) {
      return this.currentOrientation = Orientation.Vertical;
    }

    this.currentOrientation = Orientation.Horizontal;
  }

  setSize(size: Size) {
    this.currentSize = size;
    const width = `${PAGE_SIZES[size].width}px`;
    const height = `${PAGE_SIZES[size].height}px`;
    if (this.currentOrientation === Orientation.Vertical) {
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
    this.onWindowResize();
  }

  onWindowResize() {
    const parentWidth = this._canvas.parentElement.clientWidth;
    const currentCanvasWidth = this._canvas.clientWidth;
    
    if (parentWidth > currentCanvasWidth) {
      return this.renderer2.setStyle(this._canvas, 'transform', 'scale(1)');
    }

    const proportion = (parentWidth / currentCanvasWidth) * 0.9;
    this.renderer2.setStyle(this._canvas, 'transform', `scale(${proportion})`);
  }

  private _initialize() {
    this.currentSize = Size.A5;
    this.currentOrientation = Orientation.Vertical;
    this.renderer2.setStyle(this._canvas, 'background-color', '#fff');
    this.renderer2.setStyle(this._canvas, 'width', `${PAGE_SIZES[this.currentSize].width}px`);
    this.renderer2.setStyle(this._canvas, 'height', `${PAGE_SIZES[this.currentSize].height}px`);
  }

}
