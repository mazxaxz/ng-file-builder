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
    document.getElementById(this.modalElementId).className = 'show';
    document.getElementById(this.overlayElementId).className = 'show';
  }

  close() {
    this.domService.removeComponent();
    document.getElementById(this.modalElementId).className = 'hidden';
    document.getElementById(this.overlayElementId).className = 'hidden';
  }
}
