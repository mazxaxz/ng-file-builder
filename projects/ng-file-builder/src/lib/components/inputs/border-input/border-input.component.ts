import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BorderStyle, SelectOption } from '../../../ng-file-builder.models';

@Component({
  selector: 'mzx-border-input',
  templateUrl: './border-input.component.html',
  styleUrls: ['./border-input.component.scss']
})
export class BorderInputComponent implements OnInit {
  @Input() parentForm: FormGroup;
  borderStyles: SelectOption[];

  ngOnInit() {
    this.borderStyles = Object.keys(BorderStyle).map(key => {
      return { label: key, value: BorderStyle[key] } as SelectOption;
    });
  }
}
