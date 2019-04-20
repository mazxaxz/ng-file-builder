import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgFileBuilderComponent } from './ng-file-builder.component';

describe('NgFileBuilderComponent', () => {
  let component: NgFileBuilderComponent;
  let fixture: ComponentFixture<NgFileBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgFileBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgFileBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
