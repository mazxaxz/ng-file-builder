import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';

@Component({
  selector: 'mzx-ng-ticket-builder',
  templateUrl: './ng-ticket-builder.component.html',
  styleUrls: ['./ng-ticket-builder.component.scss']
})
export class NgTicketBuilderComponent implements OnInit {
  @ViewChild('builderCanvas') builderCanvas: any;
  private _canvas: any;

  constructor(private renderer2: Renderer2) { }

  ngOnInit() {
    this._canvas = this.builderCanvas.nativeElement;
    this._initialize();
  }

  private _initialize() {
    this.renderer2.setStyle(this._canvas, 'background-color', '#fff');
    this.renderer2.setStyle(this._canvas, 'width', '50%');
    this.renderer2.setStyle(this._canvas, 'height', '50%');
  }

}
