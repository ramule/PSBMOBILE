import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentHistorySuccessComponent } from './payment-history-success.component';

describe('PaymentHistorySuccessComponent', () => {
  let component: PaymentHistorySuccessComponent;
  let fixture: ComponentFixture<PaymentHistorySuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentHistorySuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentHistorySuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
