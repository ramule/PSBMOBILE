import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterBillPaymentComponent } from './water-bill-payment.component';

describe('WaterBillPaymentComponent', () => {
  let component: WaterBillPaymentComponent;
  let fixture: ComponentFixture<WaterBillPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaterBillPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterBillPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
