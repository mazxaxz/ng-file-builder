import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgTicketBuilderComponent } from './ng-ticket-builder.component';

describe('NgTicketBuilderComponent', () => {
  let component: NgTicketBuilderComponent;
  let fixture: ComponentFixture<NgTicketBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgTicketBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgTicketBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
