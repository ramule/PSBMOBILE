import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiseComplaintTransactionConfirmationComponent } from './raise-complaint-transaction-confirmation.component';

describe('RaiseComplaintTransactionConfirmationComponent', () => {
  let component: RaiseComplaintTransactionConfirmationComponent;
  let fixture: ComponentFixture<RaiseComplaintTransactionConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaiseComplaintTransactionConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaiseComplaintTransactionConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
