import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendMoneyLoanReceiptComponent } from './send-money-loan-receipt.component';

describe('SendMoneyLoanReceiptComponent', () => {
  let component: SendMoneyLoanReceiptComponent;
  let fixture: ComponentFixture<SendMoneyLoanReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendMoneyLoanReceiptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendMoneyLoanReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
