import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConvertPixelsToNumber } from '../helpers/UnitHelper';

enum KeyMap {
  ArrowUp = "ArrowUp",
  ArrowLeft = "ArrowLeft",
  ArrowRight = "ArrowRight",
  ArrowDown = "ArrowDown",
  Delete = "Delete",
  Q = "KeyQ",
  E = "KeyE",
  K = "KeyK",
  L = "KeyL",
  PlusNumPad = "NumpadAdd",
  PlusStandard = "Equal",
  MinusNumPad = "NumpadSubtract",
  MinusStandard = "Minus"
}

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

  handleKeyPress(event) {
    const focused = this.focusedElement;
    if (!focused) return;
      
    const currentY = ConvertPixelsToNumber(focused.style.top);
    const currentX = ConvertPixelsToNumber(focused.style.left);

    switch (event.code) {
      case KeyMap.ArrowUp:
        return focused.style.top = `${currentY - 1}px`;
      case KeyMap.ArrowDown:
        return focused.style.top = `${currentY + 1}px`;
      case KeyMap.ArrowLeft:
        return focused.style.left = `${currentX - 1}px`;
      case KeyMap.ArrowRight:
        return focused.style.left = `${currentX + 1}px`;
      case KeyMap.Delete:
        return true; //DeleteItem
      case KeyMap.Q:
        return true; //Rotate left
      case KeyMap.E:
        return true; //Rotate right
      default:
        if (event.code === KeyMap.K && event.ctrlKey) {
          return true; //Layer up
        }

        if (event.code === KeyMap.L && event.ctrlKey) {
          return true; //layer down
        }
        break;
    }
  }
}
