import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorpickerInputComponent } from './colorpicker-input.component';

describe('ColorpickerInputComponent', () => {
  let component: ColorpickerInputComponent;
  let fixture: ComponentFixture<ColorpickerInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorpickerInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorpickerInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
