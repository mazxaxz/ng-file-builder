import { Component, OnInit, Renderer2, OnDestroy, ViewChildren, QueryList, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { NgFileBuilderService } from '../../ng-file-builder.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { WEBSAFE_FONTS } from '../../ng-file-builder.constants';

enum Sections {
  Typography = "typography",
  General = "general"
}

@Component({
  selector: 'mzx-options-tab',
  templateUrl: './options-tab.component.html',
  styleUrls: ['./options-tab.component.scss']
})
export class OptionsTabComponent implements OnInit, OnDestroy, AfterViewInit {
  private _subs: Subscription[] = [];
  private _focusedElement: any;
  @ViewChildren('toggleIcon') toggleIcons: QueryList<any>;
  @ViewChildren('section') sections: QueryList<any>;
  private _toggleIcons: any[];
  private _sections: any[];

  Sections = Sections;
  typographyForm: FormGroup;
  generalForm: FormGroup;

  constructor(
    private fileBuilderService: NgFileBuilderService,
    private renderer2: Renderer2) { }

  ngOnInit() {
    this._focusedElement = this.fileBuilderService.focusedElement;
    this._initializeTypography();
    this._initializeGeneralForm();
    this._initializeStyles();
    this._listenForFocusedElementChange();
  }

  ngOnDestroy() {
    this._subs.forEach(sub => sub.unsubscribe());
  }

  ngAfterViewInit() {
    this._toggleIcons = this.toggleIcons.toArray();
    this._sections = this.sections.toArray();
  }

  toggleSection(section: Sections) {
    for (let i = 0; i < this._sections.length; i++) {
      const icon = this._toggleIcons[i].nativeElement;
      const sectionElement = this._sections[i].nativeElement;
      
      if (sectionElement.dataset.section === section) {
        if (sectionElement.classList.contains('expanded')) {
          this.renderer2.removeClass(sectionElement, 'expanded');
          this.renderer2.removeClass(icon, 'expanded');
          return;
        }

        this.renderer2.addClass(sectionElement, 'expanded');
        this.renderer2.addClass(icon, 'expanded');
      }
    }
  }

  private _initializeTypography() {
    this.typographyForm = new FormGroup({
      innerText: new FormControl(null),
      fontFamily: new FormControl(WEBSAFE_FONTS[0]),
      fontSize: new FormControl(14),
      fontWeight: new FormControl('400')
    });
    const innerTextSub = this.typographyForm.get('innerText').valueChanges
      .subscribe((change: string) => this._focusedElement.innerText = change);
    
    Object.keys(this.typographyForm.controls)
      .filter(k => k !== 'innerText')
      .forEach(key => {
        const sub = this.typographyForm.get(key).valueChanges
          .subscribe((change: any) => this._focusedElement.style[key] = change);
        this._subs.push(sub);
      });

    this._subs.push(innerTextSub);

    this._updateTypography();
  }

  private _updateTypography() {
    this.typographyForm.get('innerText').setValue(this._focusedElement.innerText);
  }

  private _initializeGeneralForm() {
    this.generalForm = new FormGroup({
      backgroundImage: new FormControl(null),
      backgroundColor: new FormControl(null),
      background: new FormControl(null)
    });
  }
  
  private _initializeStyles() {
    Object.keys(this._focusedElement.style).forEach(property => {
      const computedStyle = window.getComputedStyle(this._focusedElement);

      const typographyControl = this.typographyForm.get(property);
      if (typographyControl) {
        if (property === 'fontFamily' && !WEBSAFE_FONTS.includes(computedStyle.fontFamily)) {
          this._focusedElement.style[property] = WEBSAFE_FONTS[0];
          return typographyControl.setValue(WEBSAFE_FONTS[0]);
        }

        if (property === 'fontWeight' && !this._focusedElement.style[property]) {
          return typographyControl.setValue(computedStyle.fontWeight);
        }

        return typographyControl.setValue(computedStyle[property]);
      }

      const generalControl = this.generalForm.get(property);
      if (generalControl) {
        return generalControl.setValue(this._focusedElement.style[property]);
      }
    });
  }

  private _listenForFocusedElementChange() {
    const sub = this.fileBuilderService.focusElement$
      .subscribe((element: any) => {
        this._focusedElement = element;
        this._updateTypography();
        this._initializeStyles();
      });
    this._subs.push(sub);
  }

}