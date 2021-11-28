import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiseComplaintTransactionDurationSuccessComponent } from './raise-complaint-transaction-duration-success.component';

describe('RaiseComplaintTransactionDurationSuccessComponent', () => {
  let component: RaiseComplaintTransactionDurationSuccessComponent;
  let fixture: ComponentFixture<RaiseComplaintTransactionDurationSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaiseComplaintTransactionDurationSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaiseComplaintTransactionDurationSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
