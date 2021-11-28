import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeElectricityBillPaymentSuccessComponent } from './home-electricity-bill-payment-success.component';

describe('HomeElectricityBillPaymentSuccessComponent', () => {
  let component: HomeElectricityBillPaymentSuccessComponent;
  let fixture: ComponentFixture<HomeElectricityBillPaymentSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeElectricityBillPaymentSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeElectricityBillPaymentSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
