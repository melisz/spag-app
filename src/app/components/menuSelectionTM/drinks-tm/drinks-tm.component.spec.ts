import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinksTmComponent } from './drinks-tm.component';

describe('DrinksTmComponent', () => {
  let component: DrinksTmComponent;
  let fixture: ComponentFixture<DrinksTmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrinksTmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrinksTmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
