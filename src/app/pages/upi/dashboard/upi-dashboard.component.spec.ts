import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpiDashboardComponent } from './upi-dashboard.component';

describe('UpiDashboardComponent', () => {
  let component: UpiDashboardComponent;
  let fixture: ComponentFixture<UpiDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpiDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpiDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
