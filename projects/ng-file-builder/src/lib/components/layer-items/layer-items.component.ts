import { Component } from '@angular/core';
import { NgFileBuilderService } from '../../services/ng-file-builder.service';

@Component({
  selector: 'mzx-layer-items',
  templateUrl: './layer-items.component.html',
  styleUrls: ['./layer-items.component.scss']
})
export class LayerItemsComponent {
  constructor(private fileBuilderService: NgFileBuilderService) { }

  getElements(): any[] {
    return this.fileBuilderService.getElements();
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
    this.fileBuilderService.highlightElement(this.getElements()[elementIdx]);
  }

  disableHighlight(elementIdx: number) {
    this.fileBuilderService.disableHighlight$.next(this.getElements()[elementIdx]);
  }

  focus(elementIdx: number) {
    this.fileBuilderService.focusElement(this.getElements()[elementIdx]);
  }

}
