import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishesTmDetailComponent } from './dishes-tm-detail.component';

describe('DishesTmDetailComponent', () => {
  let component: DishesTmDetailComponent;
  let fixture: ComponentFixture<DishesTmDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishesTmDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishesTmDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
