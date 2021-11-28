import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillRaiseDurationTransactionDetailsComponent } from './bill-raise-duration-transaction-details.component';

describe('BillRaiseDurationTransactionDetailsComponent', () => {
  let component: BillRaiseDurationTransactionDetailsComponent;
  let fixture: ComponentFixture<BillRaiseDurationTransactionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillRaiseDurationTransactionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillRaiseDurationTransactionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
