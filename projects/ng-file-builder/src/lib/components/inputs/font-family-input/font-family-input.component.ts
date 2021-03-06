import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { WEBSAFE_FONTS } from '../../../ng-file-builder.constants';

@Component({
  selector: 'mzx-font-family-input',
  templateUrl: './font-family-input.component.html',
  styleUrls: [
    '../option-text-input/option-text-input.component.scss',
    './font-family-input.component.scss'
  ]
})
export class FontFamilyInputComponent {
  @Input() parentForm: FormGroup;
  @Input() controlName: string;
  @Input() label: string;

  WEBSAFE_FONTS = WEBSAFE_FONTS;

  cleanLabel(label: string) {
    return label.replace(/"/g, '');
  }
}
