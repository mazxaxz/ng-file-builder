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
  Z = "KeyZ",
  M = "KeyM",
  B = "KeyB",
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
  focusedElement$ = new BehaviorSubject<any>(this.focusedElement);
  disableFocus$ = new BehaviorSubject<any>(this.focusedElement);
  onDelete$ = new BehaviorSubject<any>(null);
  refresh$ = new BehaviorSubject<number>(null);

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
    this.focusedElement$.next(element);
  }

  deleteElement(element) {
    const foundIdx = this._allElements.findIndex(elem => elem === element);
    if (foundIdx === -1) return;

    this.onDelete$.next(this.focusedElement);
    this.focusedElement$.next(null);
    this.focusedElement = null;
    this._allElements.splice(foundIdx, 1);
    for (let i = foundIdx; i < this._allElements.length; i++) {
      this._allElements[i].style.zIndex = i;
    }
  }

  setRotation(degree: number) {
    this.focusedElement.setAttribute('data-rotation', `${degree}deg`);
    this.focusedElement.style.transform = `rotate(${degree}deg)`;
    this.focusedElement.style.webkitTransform = `rotate(${degree}deg)`;
    this.focusedElement.style.webkitBackfaceVisibility = 'hidden';
  }

  moveItemUp(elementIdx: number) {
    const elementsCopy = [...this.getElements()];
    if (elementIdx === (elementsCopy.length - 1)) return false;

    elementsCopy[elementIdx].style.zIndex = elementIdx + 1;
    elementsCopy[elementIdx + 1].style.zIndex = elementIdx;

    this.replaceElement(elementsCopy[elementIdx], elementIdx + 1);
    this.replaceElement(elementsCopy[elementIdx + 1], elementIdx);

    return true;
  }

  moveItemDown(elementIdx: number): boolean {
    if (elementIdx === 0) return false;

    const elementsCopy = [...this.getElements()];
    elementsCopy[elementIdx].style.zIndex = elementIdx - 1;
    elementsCopy[elementIdx - 1].style.zIndex = elementIdx;

    this.replaceElement(elementsCopy[elementIdx], elementIdx - 1);
    this.replaceElement(elementsCopy[elementIdx - 1], elementIdx);

    return true;
  }

  increaseSize(element: any, amount: number) {
    element.style.width = `${ConvertPixelsToNumber(element.style.width) + amount}px`;
    element.style.height = `${ConvertPixelsToNumber(element.style.height) + amount}px`;
  }

  decreaseSize(element: any, amount: number) {
    element.style.width = `${ConvertPixelsToNumber(element.style.width) - amount}px`;
    element.style.height = `${ConvertPixelsToNumber(element.style.height) - amount}px`;
  }

  handleKeyPress(event) {
    const focused = this.focusedElement;
    if (!focused || !(event.ctrlKey || event.altKey)) return;
      
    const currentY = ConvertPixelsToNumber(focused.style.top);
    const currentX = ConvertPixelsToNumber(focused.style.left);
    let foundIdx = -1;

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
        return this.deleteElement(this.focusedElement);
      case KeyMap.Q:
        const currentRotation = (focused.dataset.rotation || '0').replace('deg', '') << 0;
        return this.setRotation((currentRotation - 1) % 360);
      case KeyMap.Z:
        const currRotation = (focused.dataset.rotation || '0').replace('deg', '') << 0;
        return this.setRotation((currRotation + 1) % 360);
      case KeyMap.B:
        foundIdx = this._allElements.findIndex(el => el === this.focusedElement);
        if (foundIdx === -1) return;

        this.moveItemUp(foundIdx);
        return this._refresh();
      case KeyMap.M:
        foundIdx = this._allElements.findIndex(el => el === this.focusedElement);
        if (foundIdx === -1) return;

        this.moveItemDown(foundIdx);
        return this._refresh();
      default:
        if (event.code === KeyMap.PlusNumPad || event.code === KeyMap.PlusStandard) {
          return this.increaseSize(this.focusedElement, 1);
        }

        if (event.code === KeyMap.MinusNumPad || event.code === KeyMap.MinusStandard) {
          return this.decreaseSize(this.focusedElement, 1);
        }
    }
  }

  private _refresh() {
    this.refresh$.next(new Date().getMilliseconds());
  }
}
