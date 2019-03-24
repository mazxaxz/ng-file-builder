import { Component, OnInit, ViewChild, Renderer2, ViewChildren, QueryList } from '@angular/core';

enum Size {
  A5 = "A5",
  A4 = "A4",
  A3 = "A3"
}

enum Orientation {
  Horizontal = "horizontal",
  Vertical = "vertical"
}

@Component({
  selector: 'mzx-ng-ticket-builder',
  templateUrl: './ng-ticket-builder.component.html',
  styleUrls: ['./ng-ticket-builder.component.scss']
})
export class NgTicketBuilderComponent implements OnInit {
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

  changeOrientation() {
    const width = this._canvas.style.width;
    const height = this._canvas.style.height;
    this.renderer2.setStyle(this._canvas, 'width', height);
    this.renderer2.setStyle(this._canvas, 'height', width);

    if (this.currentOrientation === Orientation.Horizontal) {
      return this.currentOrientation = Orientation.Vertical;
    }

    this.currentOrientation = Orientation.Horizontal;
  }

  setSize(size: Size) {
    this.currentSize = size;
    this.sizeActions.forEach(action => {
      const nativeElement = action.nativeElement;
      if (nativeElement.dataset.size === size) {
        return this.renderer2.addClass(nativeElement, 'active');
      }

      return this.renderer2.removeClass(nativeElement, 'active');
    });
  }

  private _initialize() {
    this.currentSize = Size.A4;
    this.currentOrientation = Orientation.Vertical;
    this.renderer2.setStyle(this._canvas, 'background-color', '#fff');
    this.renderer2.setStyle(this._canvas, 'width', '200px');
    this.renderer2.setStyle(this._canvas, 'height', '400px');
  }

}
