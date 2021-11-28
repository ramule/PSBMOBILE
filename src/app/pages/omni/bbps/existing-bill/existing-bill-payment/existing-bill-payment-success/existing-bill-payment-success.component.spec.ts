import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingBillPaymentSuccessComponent } from './existing-bill-payment-success.component';

describe('ExistingBillPaymentSuccessComponent', () => {
  let component: ExistingBillPaymentSuccessComponent;
  let fixture: ComponentFixture<ExistingBillPaymentSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExistingBillPaymentSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingBillPaymentSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
