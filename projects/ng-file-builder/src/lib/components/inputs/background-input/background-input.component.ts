import { Component, OnInit, Input, ViewChildren, QueryList, Renderer2, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BackgroundType } from '../../../ng-file-builder.models';

@Component({
  selector: 'mzx-background-input',
  templateUrl: './background-input.component.html',
  styleUrls: ['./background-input.component.scss']
})
export class BackgroundInputComponent implements OnInit, AfterViewInit {
  @Input() parentForm: FormGroup;
  @ViewChildren('toggleButton') toggleButtons: QueryList<any>;

  BackgroundType = BackgroundType;
  
  constructor(private renderer2: Renderer2) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    const type = this.parentForm.get('backgroundType').value as BackgroundType;
    this._updateTogglers(type);
  }

  setBackgroundType(type: BackgroundType) {
    const abstractControl = this.parentForm.get('backgroundType');
    if (abstractControl.value === type) return;

    abstractControl.setValue(type);
    this._updateTogglers(type);
  }

  private _updateTogglers(type: BackgroundType) {
    this.toggleButtons.forEach(toggler => {
      const button = toggler.nativeElement;
      if (button.classList.contains('active')) {
        this.renderer2.removeClass(button, 'active');
      }

      if (button.classList.contains(type)) {
        this.renderer2.addClass(button, 'active');
      }
    });
  }

}
