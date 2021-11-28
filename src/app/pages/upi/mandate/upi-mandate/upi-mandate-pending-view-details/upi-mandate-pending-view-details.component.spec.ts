import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpiMandatePendingViewDetailsComponent } from './upi-mandate-pending-view-details.component';

describe('UpiMandatePendingViewDetailsComponent', () => {
  let component: UpiMandatePendingViewDetailsComponent;
  let fixture: ComponentFixture<UpiMandatePendingViewDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpiMandatePendingViewDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpiMandatePendingViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
