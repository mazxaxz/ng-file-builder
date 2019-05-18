import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'mzx-degree-input',
  templateUrl: './degree-input.component.html',
  styleUrls: [
    '../option-text-input/option-text-input.component.scss',
    './degree-input.component.scss'
  ]
})
export class DegreeInputComponent {
  @Input() parentForm: FormGroup;
  @Input() controlName: string;
  @Input() label: string;
}
