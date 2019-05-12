import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonGroupInputComponent } from './button-group-input.component';

describe('ButtonGroupInputComponent', () => {
  let component: ButtonGroupInputComponent;
  let fixture: ComponentFixture<ButtonGroupInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonGroupInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonGroupInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
