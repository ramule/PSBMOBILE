import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricityBillPaymentSuccessComponent } from './electricity-bill-payment-success.component';

describe('ElectricityBillPaymentSuccessComponent', () => {
  let component: ElectricityBillPaymentSuccessComponent;
  let fixture: ComponentFixture<ElectricityBillPaymentSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectricityBillPaymentSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectricityBillPaymentSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
