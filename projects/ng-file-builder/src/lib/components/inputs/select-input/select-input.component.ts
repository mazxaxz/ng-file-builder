import { Component, OnInit, Input } from '@angular/core';
import { SelectOption } from '../../../ng-file-builder.models';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'mzx-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: [
    '../option-text-input/option-text-input.component.scss',
    './select-input.component.scss'
  ]
})
export class SelectInputComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() controlName: string;
  @Input() label: string;
  @Input() options: SelectOption[];

  constructor() { }

  ngOnInit() {
  }

}
