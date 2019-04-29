import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundInputComponent } from './background-input.component';

describe('BackgroundInputComponent', () => {
  let component: BackgroundInputComponent;
  let fixture: ComponentFixture<BackgroundInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackgroundInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgroundInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
