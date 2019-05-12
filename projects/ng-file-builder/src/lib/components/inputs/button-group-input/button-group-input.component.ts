import { Component, OnInit, Input, Output, EventEmitter, ViewChildren, QueryList, Renderer2 } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ButtonToggler } from '../../../ng-file-builder.models';

@Component({
  selector: 'mzx-button-group-input',
  templateUrl: './button-group-input.component.html',
  styleUrls: ['./button-group-input.component.scss']
})
export class ButtonGroupInputComponent {
  @ViewChildren('toggleButton') toggleButtons: QueryList<any>;
  @Input() parentForm: FormGroup;
  @Input() controlName: string;
  @Input() label?: string = '';
  @Input() buttons: ButtonToggler[];
  @Output() onValueChange = new EventEmitter<any>();

  constructor(private renderer2: Renderer2) { }

  handle(value: any) {
    const abstractControl = this.parentForm.get(this.controlName);
    if (abstractControl.value === value) return;

    abstractControl.setValue(value);
    this.onValueChange.emit(value);
    this._updateView(value);
  }

  private _updateView(value: any) {
    this.toggleButtons.forEach(toggler => {
      const button = toggler.nativeElement;
      if (button.classList.contains('active')) {
        this.renderer2.removeClass(button, 'active');
      }

      if (button.classList.contains(value)) {
        this.renderer2.addClass(button, 'active');
      }
    });
  }
}
