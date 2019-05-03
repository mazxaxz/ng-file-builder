import { Component, Input } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'mzx-modal-box-header',
  templateUrl: './modal-box-header.component.html',
  styleUrls: ['./modal-box-header.component.scss']
})
export class ModalBoxHeaderComponent {
  @Input() text: string;

  constructor(private modalService: ModalService) { }

  close() {
    this.modalService.close();
  }
}
