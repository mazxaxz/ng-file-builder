import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerItemsComponent } from './layer-items.component';

describe('LayerItemComponent', () => {
  let component: LayerItemsComponent;
  let fixture: ComponentFixture<LayerItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayerItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
