import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'mzx-range-input',
  templateUrl: './range-input.component.html',
  styleUrls: ['./range-input.component.scss']
})
export class RangeInputComponent {
  @Input() parentForm: FormGroup;
  @Input() controlName: string;
  @Input() label: string;
  @Input() min?: number = 0;
  @Input() max?: number = 100;
  @Input() step?: number = 1;
}
