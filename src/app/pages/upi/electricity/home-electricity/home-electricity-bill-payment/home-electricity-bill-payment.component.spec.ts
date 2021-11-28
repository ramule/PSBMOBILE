import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeElectricityBillPaymentComponent } from './home-electricity-bill-payment.component';

describe('HomeElectricityBillPaymentComponent', () => {
  let component: HomeElectricityBillPaymentComponent;
  let fixture: ComponentFixture<HomeElectricityBillPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeElectricityBillPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeElectricityBillPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
