import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FONT_WEIGHTS } from '../../../ng-file-builder.constants';

@Component({
  selector: 'mzx-font-weight-input',
  templateUrl: './font-weight-input.component.html',
  styleUrls: [
    '../option-text-input/option-text-input.component.scss',
    './font-weight-input.component.scss'
  ]
})
export class FontWeightInputComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() controlName: string;
  @Input() label: string;
  
  FONT_WEIGHTS = FONT_WEIGHTS;
  weightKeys: string[];

  ngOnInit() {
    this.weightKeys = Object.keys(FONT_WEIGHTS);
  }
}
