import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllLogsComponent } from './view-all-logs.component';

describe('ViewAllLogsComponent', () => {
  let component: ViewAllLogsComponent;
  let fixture: ComponentFixture<ViewAllLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
