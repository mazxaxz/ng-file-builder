import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'mzx-option-text-input',
  templateUrl: './option-text-input.component.html',
  styleUrls: ['./option-text-input.component.scss']
})
export class OptionTextInputComponent {
  @Input() parentForm: FormGroup;
  @Input() controlName: string;
  @Input() label: string;
}
