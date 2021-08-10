import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateMenuComponent } from './generate-menu.component';

describe('GenerateMenuComponent', () => {
  let component: GenerateMenuComponent;
  let fixture: ComponentFixture<GenerateMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
