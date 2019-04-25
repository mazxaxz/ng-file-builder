import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FontSizeInputComponent } from './font-size-input.component';

describe('FontSizeInputComponent', () => {
  let component: FontSizeInputComponent;
  let fixture: ComponentFixture<FontSizeInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FontSizeInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FontSizeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
