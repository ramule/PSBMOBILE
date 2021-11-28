import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiseComplaintTransactionSuccessComponent } from './raise-complaint-transaction-success.component';

describe('RaiseComplaintTransactionSuccessComponent', () => {
  let component: RaiseComplaintTransactionSuccessComponent;
  let fixture: ComponentFixture<RaiseComplaintTransactionSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaiseComplaintTransactionSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaiseComplaintTransactionSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
