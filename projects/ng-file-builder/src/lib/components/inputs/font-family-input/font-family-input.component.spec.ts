import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FontFamilyInputComponent } from './font-family-input.component';

describe('FontSelectorInputComponent', () => {
  let component: FontFamilyInputComponent;
  let fixture: ComponentFixture<FontFamilyInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FontFamilyInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FontFamilyInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
