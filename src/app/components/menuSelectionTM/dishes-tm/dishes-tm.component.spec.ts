import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishesTMComponent } from './dishes-tm.component';

describe('DishesTMComponent', () => {
  let component: DishesTMComponent;
  let fixture: ComponentFixture<DishesTMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishesTMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishesTMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
