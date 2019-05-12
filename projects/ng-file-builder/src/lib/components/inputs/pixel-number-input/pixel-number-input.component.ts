import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'mzx-pixel-number-input',
  templateUrl: './pixel-number-input.component.html',
  styleUrls: [
    '../option-text-input/option-text-input.component.scss',
    './pixel-number-input.component.scss'
  ]
})
export class PixelNumberInputComponent {
  @Input() parentForm: FormGroup;
  @Input() controlName: string;
  @Input() label: string;
}
