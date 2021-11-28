import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayUpiPaymentComponent } from './pay-upi-payment.component';

describe('PayUpiPaymentComponent', () => {
  let component: PayUpiPaymentComponent;
  let fixture: ComponentFixture<PayUpiPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayUpiPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayUpiPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
