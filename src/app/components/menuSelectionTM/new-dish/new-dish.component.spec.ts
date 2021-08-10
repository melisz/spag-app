import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDishComponent } from './new-dish.component';

describe('NewDishComponent', () => {
  let component: NewDishComponent;
  let fixture: ComponentFixture<NewDishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
