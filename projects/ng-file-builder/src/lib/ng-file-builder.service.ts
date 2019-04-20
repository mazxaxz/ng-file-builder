import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NgFileBuilderService {
  private _allElements: any[] = [];
  private _highlightedElement = null;
  highlightedElement$ = new BehaviorSubject<any>(this._highlightedElement);
  disableHighlight$ = new BehaviorSubject<any>(this._highlightedElement);

  focusedElement = null;
  focusElement$ = new BehaviorSubject<any>(this.focusedElement);
  disableFocus$ = new BehaviorSubject<any>(this.focusedElement);

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

  focusElement(element) {
    this.disableFocus$.next(this.focusedElement);
    this.focusedElement = element;
    this.focusElement$.next(element);
  }
}
