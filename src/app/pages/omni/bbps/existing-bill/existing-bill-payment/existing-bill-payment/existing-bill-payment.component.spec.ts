import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingBillPaymentComponent } from './existing-bill-payment.component';

describe('ExistingBillPaymentComponent', () => {
  let component: ExistingBillPaymentComponent;
  let fixture: ComponentFixture<ExistingBillPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExistingBillPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingBillPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
