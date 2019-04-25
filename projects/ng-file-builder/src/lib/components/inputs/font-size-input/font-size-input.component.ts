import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'mzx-font-size-input',
  templateUrl: './font-size-input.component.html',
  styleUrls: ['./font-size-input.component.scss']
})
export class FontSizeInputComponent {
  @Input() parentForm: FormGroup;
  @Input() controlName: string;
  @Input() label: string;
}
