import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionStatusReceiptComponent } from './transaction-status-receipt.component';

describe('TransactionStatusReceiptComponent', () => {
  let component: TransactionStatusReceiptComponent;
  let fixture: ComponentFixture<TransactionStatusReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionStatusReceiptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionStatusReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
