import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseMenuSelectionComponent } from './base-menu-selection.component';

describe('BaseMenuSelectionComponent', () => {
  let component: BaseMenuSelectionComponent;
  let fixture: ComponentFixture<BaseMenuSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseMenuSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseMenuSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
