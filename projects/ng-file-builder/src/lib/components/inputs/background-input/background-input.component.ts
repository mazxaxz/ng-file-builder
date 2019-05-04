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
  @ViewChildren('textureBlock') textureBlocks: QueryList<any>;
  @ViewChildren('backgroundTypeOptions') backgroundTypeOptions: QueryList<any>;

  BackgroundType = BackgroundType;
  currentType = BackgroundType.Color;

  AVAILABLE_TEXTURES = AVAILABLE_TEXTURES;
  
  constructor(private renderer2: Renderer2) { }

  ngOnInit() {
    this.currentType = this.parentForm.get('backgroundType').value as BackgroundType;
  }

  ngAfterViewInit() {
    this._updateBgTypeView(this.currentType);

    if (this.currentType === BackgroundType.Texture) {
      this._updateTextures(this.parentForm.get('background').value);
    }
  }

  setBackgroundType(type: BackgroundType) {
    const abstractControl = this.parentForm.get('backgroundType');
    if (abstractControl.value === type) return;

    abstractControl.setValue(type);
    this.currentType = type;
    this._updateBgTypeView(type);
  }

  chooseTexture(url: string) {
    const abstractControl = this.parentForm.get('background');
    if (abstractControl.value === url) return;

    abstractControl.setValue(url);
    this._updateTextures(url);
  }

  private _updateBgTypeView(type: BackgroundType) {
    this.toggleButtons.forEach(toggler => {
      const button = toggler.nativeElement;
      if (button.classList.contains('active')) {
        this.renderer2.removeClass(button, 'active');
      }

      if (button.classList.contains(type)) {
        this.renderer2.addClass(button, 'active');
      }
    });

    this.backgroundTypeOptions.forEach(container => {
      const element = container.nativeElement;
      if (element.classList.contains('active')) {
        this.renderer2.removeClass(element, 'active');
      }

      if (element.classList.contains(`input-${type}`)) {
        this.renderer2.addClass(element, 'active');
      }
    })
  }

  private _updateTextures(url: string) {
    this.textureBlocks.forEach(block => {
      const texture = block.nativeElement;
      if (texture.classList.contains('chosen')) {
        this.renderer2.removeClass(texture, 'chosen');
      }

      if (texture.style.background.includes(url)) {
        this.renderer2.addClass(texture, 'chosen');
      }
    })
  }
}
