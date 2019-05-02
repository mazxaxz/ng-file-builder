import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'mzx-modal-setup',
  templateUrl: './modal-setup.component.html',
  styleUrls: ['./modal-setup.component.scss']
})
export class ModalSetupComponent {

  constructor(private modalService: ModalService) { }

  removeModal() {
    this.modalService.close();
  }
}
