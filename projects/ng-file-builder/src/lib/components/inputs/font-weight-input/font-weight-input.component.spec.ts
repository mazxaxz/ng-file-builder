import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FontWeightInputComponent } from './font-weight-input.component';

describe('FontWeightInputComponent', () => {
  let component: FontWeightInputComponent;
  let fixture: ComponentFixture<FontWeightInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FontWeightInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FontWeightInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
