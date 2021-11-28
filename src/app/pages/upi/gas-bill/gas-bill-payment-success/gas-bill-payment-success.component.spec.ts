import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GasBillPaymentSuccessComponent } from './gas-bill-payment-success.component';

describe('GasBillPaymentSuccessComponent', () => {
  let component: GasBillPaymentSuccessComponent;
  let fixture: ComponentFixture<GasBillPaymentSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GasBillPaymentSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GasBillPaymentSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
