import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillRaiseComplaintServiceConfirmationComponent } from './bill-raise-complaint-service-confirmation.component';

describe('BillRaiseComplaintServiceConfirmationComponent', () => {
  let component: BillRaiseComplaintServiceConfirmationComponent;
  let fixture: ComponentFixture<BillRaiseComplaintServiceConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillRaiseComplaintServiceConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillRaiseComplaintServiceConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
