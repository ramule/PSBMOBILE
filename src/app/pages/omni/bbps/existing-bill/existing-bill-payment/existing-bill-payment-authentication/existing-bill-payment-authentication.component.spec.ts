import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingBillPaymentAuthenticationComponent } from './existing-bill-payment-authentication.component';

describe('ExistingBillPaymentAuthenticationComponent', () => {
  let component: ExistingBillPaymentAuthenticationComponent;
  let fixture: ComponentFixture<ExistingBillPaymentAuthenticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExistingBillPaymentAuthenticationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingBillPaymentAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
