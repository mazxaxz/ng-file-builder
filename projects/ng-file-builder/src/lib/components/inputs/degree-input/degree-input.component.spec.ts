import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DegreeInputComponent } from './degree-input.component';

describe('DegreeInputComponent', () => {
  let component: DegreeInputComponent;
  let fixture: ComponentFixture<DegreeInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DegreeInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DegreeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
