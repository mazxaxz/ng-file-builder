import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportTemplateBoxComponent } from './export-template-box.component';

describe('ExportTemplateBoxComponent', () => {
  let component: ExportTemplateBoxComponent;
  let fixture: ComponentFixture<ExportTemplateBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportTemplateBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportTemplateBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
