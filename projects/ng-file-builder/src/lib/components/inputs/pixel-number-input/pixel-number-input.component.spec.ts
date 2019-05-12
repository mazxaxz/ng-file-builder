import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PixelNumberInputComponent } from './pixel-number-input.component';

describe('PixelNumberInputComponent', () => {
  let component: PixelNumberInputComponent;
  let fixture: ComponentFixture<PixelNumberInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PixelNumberInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PixelNumberInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
