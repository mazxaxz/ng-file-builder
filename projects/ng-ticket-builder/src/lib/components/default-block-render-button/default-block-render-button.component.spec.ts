import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultBlockRenderButtonComponent } from './default-block-render-button.component';

describe('DefaultBlockRenderButtonComponent', () => {
  let component: DefaultBlockRenderButtonComponent;
  let fixture: ComponentFixture<DefaultBlockRenderButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultBlockRenderButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultBlockRenderButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
