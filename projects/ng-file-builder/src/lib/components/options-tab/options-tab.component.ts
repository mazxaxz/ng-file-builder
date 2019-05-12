import { Component, OnInit, Renderer2, OnDestroy, ViewChildren, QueryList, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { NgFileBuilderService } from '../../services/ng-file-builder.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { WEBSAFE_FONTS } from '../../ng-file-builder.constants';
import { BackgroundType } from '../../ng-file-builder.models';
import { fullRgbToHex, rgbStringToArray } from '../../helpers/ColorHelpers';

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
        if (sectionElement.classList.contains(`expanded-${section}`)) {
          this.renderer2.removeClass(sectionElement, `expanded-${section}`);
          this.renderer2.removeClass(icon, `expanded-${section}`);
          return;
        }

        this.renderer2.addClass(sectionElement, `expanded-${section}`);
        this.renderer2.addClass(icon, `expanded-${section}`);
      }
    }
  }

  private _initializeTypography() {
    this.typographyForm = new FormGroup({
      innerText: new FormControl(null),
      fontFamily: new FormControl(WEBSAFE_FONTS[0]),
      fontSize: new FormControl(14),
      fontWeight: new FormControl('400'),
      color: new FormControl('#000000'),
      textAlign: new FormControl('left')
    });
    const innerTextSub = this.typographyForm.get('innerText').valueChanges
      .subscribe((change: string) => this._focusedElement.innerText = change);
    
    Object.keys(this.typographyForm.controls)
      .filter(k => k !== 'innerText')
      .forEach(key => {
        const sub = this.typographyForm.get(key).valueChanges
          .subscribe((change: any) => {
            if (key === 'fontSize') {
              change += 'px';
            }

            this._focusedElement.style[key] = change;
          });
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
      backgroundType: new FormControl(BackgroundType.Color),
      background: new FormControl(null),
      opacity: new FormControl(1)
    });

    const bgTypeSub = this.generalForm.get('backgroundType').valueChanges
      .subscribe((type: BackgroundType) => {
        let repeat = 'no-repeat';
        if (type === BackgroundType.Texture) {
          repeat = 'repeat';
        }

        this.renderer2.setStyle(this.fileBuilderService.focusedElement, 'background-repeat', repeat);
      });

    const bgChangedSub = this.generalForm.get('background').valueChanges
      .subscribe((value: string) => {
        const type = this.generalForm.get('backgroundType').value as BackgroundType;
        let bgValue = value;
        if (type === BackgroundType.Url || type === BackgroundType.Texture) {
          bgValue = `url('${value}')`;
        }

        this.renderer2.setStyle(this.fileBuilderService.focusedElement, 'background', bgValue);
      });

    Object.keys(this.generalForm.controls)
      .filter(k => !k.includes('background'))
      .forEach(key => {
        const sub = this.generalForm.get(key).valueChanges
          .subscribe(value => {
            this.renderer2.setStyle(this.fileBuilderService.focusedElement, key, value);
          });
        this._subs.push(sub);
      });

    this._subs.push(bgTypeSub, bgChangedSub);
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

        if (property === 'fontSize') {
          return typographyControl.setValue(computedStyle[property].replace(/[^0-9\.]+/g, ''));
        }

        return typographyControl.setValue(computedStyle[property]);
      }

      const generalControl = this.generalForm.get(property);
      if (generalControl) {
        const propertyValue = computedStyle[property];

        if (property.includes('background')) {
          const bgTypeAbstractControl = this.generalForm.get('backgroundType');
          if (/^(rgb|#)/i.test(propertyValue) && !propertyValue.includes('url(')) {
            bgTypeAbstractControl.setValue(BackgroundType.Color);
            if (propertyValue.startsWith('#')) {
              return this.generalForm.setValue(propertyValue.substr(0, 7));
            }
            const colorArray = rgbStringToArray(propertyValue);
            if (colorArray[3] === 0) return;

            return generalControl.setValue(fullRgbToHex(colorArray[0], colorArray[1], colorArray[2]));
          }

          if (computedStyle.backgroundRepeat === 'repeat') {
            bgTypeAbstractControl.setValue(BackgroundType.Texture);
          } else {
            bgTypeAbstractControl.setValue(BackgroundType.Url);
          }

          let url = propertyValue.substring(propertyValue.indexOf('url("') + 5);
          url = url.substring(0, url.indexOf('")'));
          return generalControl.setValue(url);
        }

        return generalControl.setValue(propertyValue);
      }
    });
  }

  private _listenForFocusedElementChange() {
    const sub = this.fileBuilderService.focusedElement$
      .subscribe((element: any) => {
        if (element === null) return;

        this._focusedElement = element;
        this._updateTypography();
        this._initializeStyles();
      });
    this._subs.push(sub);
  }

}
