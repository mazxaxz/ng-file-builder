import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportTemplateBoxComponent } from './import-template-box.component';

describe('ImportTemplateBoxComponent', () => {
  let component: ImportTemplateBoxComponent;
  let fixture: ComponentFixture<ImportTemplateBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportTemplateBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportTemplateBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
