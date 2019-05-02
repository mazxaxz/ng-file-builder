import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSetupComponent } from './modal-setup.component';

describe('ModalSetupComponent', () => {
  let component: ModalSetupComponent;
  let fixture: ComponentFixture<ModalSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
