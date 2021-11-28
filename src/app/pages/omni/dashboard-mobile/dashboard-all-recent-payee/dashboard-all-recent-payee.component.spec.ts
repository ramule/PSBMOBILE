import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAllRecentPayeeComponent } from './dashboard-all-recent-payee.component';

describe('DashboardAllRecentPayeeComponent', () => {
  let component: DashboardAllRecentPayeeComponent;
  let fixture: ComponentFixture<DashboardAllRecentPayeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardAllRecentPayeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAllRecentPayeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
