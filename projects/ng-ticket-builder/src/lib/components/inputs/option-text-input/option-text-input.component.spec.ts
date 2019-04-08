import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionTextInputComponent } from './option-text-input.component';

describe('OptionTextInputComponent', () => {
  let component: OptionTextInputComponent;
  let fixture: ComponentFixture<OptionTextInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionTextInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionTextInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
