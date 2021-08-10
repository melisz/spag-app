import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckedTaskComponent } from './checked-task.component';

describe('CheckedTaskComponent', () => {
  let component: CheckedTaskComponent;
  let fixture: ComponentFixture<CheckedTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckedTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckedTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
