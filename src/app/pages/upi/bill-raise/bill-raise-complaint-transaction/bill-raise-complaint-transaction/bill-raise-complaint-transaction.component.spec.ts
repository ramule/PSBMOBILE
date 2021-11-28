import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillRaiseComplaintTransactionComponent } from './bill-raise-complaint-transaction.component';

describe('BillRaiseComplaintTransactionComponent', () => {
  let component: BillRaiseComplaintTransactionComponent;
  let fixture: ComponentFixture<BillRaiseComplaintTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillRaiseComplaintTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillRaiseComplaintTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
