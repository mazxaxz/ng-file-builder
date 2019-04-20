import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'mzx-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() parentForm: FormGroup;
  @Input() arrayName: string;
  @Input() groupName: number;
  @Input() controlName: string;
  @Input() label: string;

  getGroup() {
    return this.parentForm.controls[this.arrayName].get(this.groupName.toString());
  }

}
