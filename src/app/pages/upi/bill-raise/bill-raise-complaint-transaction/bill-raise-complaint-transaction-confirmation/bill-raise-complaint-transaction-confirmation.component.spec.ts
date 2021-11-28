import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillRaiseComplaintTransactionConfirmationComponent } from './bill-raise-complaint-transaction-confirmation.component';

describe('BillRaiseComplaintTransactionConfirmationComponent', () => {
  let component: BillRaiseComplaintTransactionConfirmationComponent;
  let fixture: ComponentFixture<BillRaiseComplaintTransactionConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillRaiseComplaintTransactionConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillRaiseComplaintTransactionConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
