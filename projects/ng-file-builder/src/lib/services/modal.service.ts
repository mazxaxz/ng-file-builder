import { Injectable } from '@angular/core';
import { DomService } from './dom.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalElementId = 'mzx-modal-container';
  private overlayElementId = 'mzx-overlay';

  constructor(private domService: DomService) { }

  open(component: any) {
    this.domService.appendComponentTo(this.modalElementId, component);
    document.getElementById(this.overlayElementId).classList.add('opened');
    document.getElementById(this.modalElementId).classList.add('opened');
  }

  close() {
    this.domService.removeComponent();
    document.getElementById(this.modalElementId).classList.remove('opened');
    document.getElementById(this.overlayElementId).classList.remove('opened');
  }
}
