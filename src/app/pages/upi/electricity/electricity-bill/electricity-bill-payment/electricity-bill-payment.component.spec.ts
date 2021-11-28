import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricityBillPaymentComponent } from './electricity-bill-payment.component';

describe('ElectricityBillPaymentComponent', () => {
  let component: ElectricityBillPaymentComponent;
  let fixture: ComponentFixture<ElectricityBillPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectricityBillPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectricityBillPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
