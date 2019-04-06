import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NgTicketBuilderService {
  private _allElements: any[] = [];
  private _highlightedElement = null;
  highlightedElement$ = new BehaviorSubject<any>(this._highlightedElement);
  disableHighlight$ = new BehaviorSubject<any>(this._highlightedElement);

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

  highlightElement(element) {
    this.disableHighlight$.next(this._highlightedElement);
    this.highlightedElement$.next(element);
    this._highlightedElement = element;
  }
}
