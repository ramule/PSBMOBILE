import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillRaiseComplaintTransactionSuccessComponent } from './bill-raise-complaint-transaction-success.component';

describe('BillRaiseComplaintTransactionSuccessComponent', () => {
  let component: BillRaiseComplaintTransactionSuccessComponent;
  let fixture: ComponentFixture<BillRaiseComplaintTransactionSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillRaiseComplaintTransactionSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillRaiseComplaintTransactionSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
