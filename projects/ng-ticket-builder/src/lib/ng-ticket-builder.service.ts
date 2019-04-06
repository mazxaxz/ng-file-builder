import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NgTicketBuilderService {
  private _allElements: any[] = [];

  constructor() { }

  getElements(): any[] {
    return this._allElements;
  }

  addElement(element) {
    this._allElements.push(element);
  }

  replaceElement(element, idx) {
    this._allElements[idx] = element;
  }

  sortByZIndex() {
    this._allElements = this._allElements.sort((a, b) => +a.style.zIndex - +b.style.zIndex)
      .map((element: any, idx: number) => {
        element.style.zIndex = idx;
        return element;
      });
  }
}
