import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillRaiseComplaintAssignConfirmationComponent } from './bill-raise-complaint-assign-confirmation.component';

describe('BillRaiseComplaintAssignConfirmationComponent', () => {
  let component: BillRaiseComplaintAssignConfirmationComponent;
  let fixture: ComponentFixture<BillRaiseComplaintAssignConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillRaiseComplaintAssignConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillRaiseComplaintAssignConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
