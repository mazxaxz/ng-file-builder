import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBoxHeaderComponent } from './modal-box-header.component';

describe('ModalBoxHeaderComponent', () => {
  let component: ModalBoxHeaderComponent;
  let fixture: ComponentFixture<ModalBoxHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBoxHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBoxHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
