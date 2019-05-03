import { Component, Input, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mzx-colorpicker-input',
  templateUrl: './colorpicker-input.component.html',
  styleUrls: ['./colorpicker-input.component.scss']
})
export class ColorpickerInputComponent implements OnInit, OnDestroy {
  private _subs: Subscription[] = [];
  @Input() parentForm: FormGroup;
  @Input() controlName: string;

  currentColor: string = '#000000';

  constructor(private ref: ChangeDetectorRef) {}

  ngOnInit() {
    this.currentColor = this.parentForm.get(this.controlName).value;
    const sub = this.parentForm.get(this.controlName).valueChanges
      .subscribe((color: string) => {
        this.currentColor = color;
        this.ref.detectChanges();
      });
    this._subs.push(sub);
  }

  ngOnDestroy() {
    this._subs.forEach(sub => sub.unsubscribe());
  }

  colorChange() {
    this.parentForm.get(this.controlName).setValue(this.currentColor);
    this.ref.detectChanges();
  }

}
