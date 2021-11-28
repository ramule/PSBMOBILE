import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingBillPayNowComponent } from './pending-bill-pay-now.component';

describe('PendingBillPayNowComponent', () => {
  let component: PendingBillPayNowComponent;
  let fixture: ComponentFixture<PendingBillPayNowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingBillPayNowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingBillPayNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
