import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NgFileBuilderService } from '../../services/ng-file-builder.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mzx-layer-items',
  templateUrl: './layer-items.component.html',
  styleUrls: ['./layer-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayerItemsComponent implements OnInit, OnDestroy {
  private _subs: Subscription[] = [];
  elements: any[] = [];

  constructor(
    private fileBuilderService: NgFileBuilderService,
    private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.elements = this._getElements();
    const sub = this.fileBuilderService.refresh$
      .subscribe(val => val ? this._updateElements() : null);
    this._subs.push(sub);
  }

  ngOnDestroy() {
    this._subs.forEach(sub => sub.unsubscribe());
  }

  getElementBackground(element) {
    const style = element.style;
    if (style.backgroundImage && style.backgroundImage !== 'initial') {
      return style.backgroundImage;
    }

    if (style.backgroundColor && style.backgroundColor !== 'initial') {
      return style.backgroundColor;
    }

    if (style.background && style.background !== 'initial') {
      return style.background;
    }

    return '#fff';
  }

  layerUp(elementIdx: number, event) {
    event.stopPropagation();
    this.fileBuilderService.moveItemUp(elementIdx);
  }

  layerDown(elementIdx: number, event) {
    event.stopPropagation();
    this.fileBuilderService.moveItemDown(elementIdx);
  }

  highlight(elementIdx: number) {
    this.fileBuilderService.highlightElement(this._getElements()[elementIdx]);
  }

  disableHighlight(elementIdx: number) {
    this.fileBuilderService.disableHighlight$.next(this._getElements()[elementIdx]);
  }

  focus(elementIdx: number) {
    this.fileBuilderService.focusElement(this._getElements()[elementIdx]);
  }

  private _updateElements() {
    this.elements = this._getElements();
    this.ref.detectChanges();
  }

  private _getElements() {
    return this.fileBuilderService.getElements();
  }
}
