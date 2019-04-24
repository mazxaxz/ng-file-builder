import { Component, OnInit, Renderer2 } from '@angular/core';
import { NgFileBuilderService } from '../../ng-file-builder.service';

@Component({
  selector: 'mzx-layer-items',
  templateUrl: './layer-items.component.html',
  styleUrls: ['./layer-items.component.scss']
})
export class LayerItemsComponent implements OnInit {
  constructor(
    private fileBuilderService: NgFileBuilderService,
    private renderer2: Renderer2) { }

  ngOnInit() {
  }

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
    const elementsCopy = [...this.getElements()];
    if (elementIdx === (elementsCopy.length - 1)) return;

    this.renderer2.setStyle(elementsCopy[elementIdx], 'z-index', elementIdx + 1);
    this.renderer2.setStyle(elementsCopy[elementIdx + 1], 'z-index', elementIdx);

    this.fileBuilderService.replaceElement(elementsCopy[elementIdx], elementIdx + 1);
    this.fileBuilderService.replaceElement(elementsCopy[elementIdx + 1], elementIdx);
  }

  layerDown(elementIdx: number, event) {
    event.stopPropagation();
    if (elementIdx === 0) return;

    const elementsCopy = [...this.getElements()];
    this.renderer2.setStyle(elementsCopy[elementIdx], 'z-index', elementIdx - 1);
    this.renderer2.setStyle(elementsCopy[elementIdx - 1], 'z-index', elementIdx);

    this.fileBuilderService.replaceElement(elementsCopy[elementIdx], elementIdx - 1);
    this.fileBuilderService.replaceElement(elementsCopy[elementIdx - 1], elementIdx);
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
