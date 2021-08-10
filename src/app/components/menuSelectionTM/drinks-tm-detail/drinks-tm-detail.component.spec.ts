import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinksTmDetailComponent } from './drinks-tm-detail.component';

describe('DrinksTmDetailComponent', () => {
  let component: DrinksTmDetailComponent;
  let fixture: ComponentFixture<DrinksTmDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrinksTmDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrinksTmDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
