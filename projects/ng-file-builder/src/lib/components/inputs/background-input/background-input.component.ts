import { Component, OnInit, Input, ViewChildren, QueryList, Renderer2, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BackgroundType } from '../../../ng-file-builder.models';
import { AVAILABLE_TEXTURES } from '../../../ng-file-builder.constants';

@Component({
  selector: 'mzx-background-input',
  templateUrl: './background-input.component.html',
  styleUrls: ['./background-input.component.scss']
})
export class BackgroundInputComponent implements OnInit, AfterViewInit {
  @Input() parentForm: FormGroup;
  @ViewChildren('toggleButton') toggleButtons: QueryList<any>;

  BackgroundType = BackgroundType;
  currentType = BackgroundType.Color;

  AVAILABLE_TEXTURES = AVAILABLE_TEXTURES;
  
  constructor(private renderer2: Renderer2) { }

  ngOnInit() {
    this.currentType = this.parentForm.get('backgroundType').value as BackgroundType;
  }

  ngAfterViewInit() {
    this._updateTogglers(this.currentType);
  }

  setBackgroundType(type: BackgroundType) {
    const abstractControl = this.parentForm.get('backgroundType');
    if (abstractControl.value === type) return;

    abstractControl.setValue(type);
    this.currentType = type;
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
