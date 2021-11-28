import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBillReminderConfirmationComponent } from './add-bill-reminder-confirmation.component';

describe('AddBillReminderConfirmationComponent', () => {
  let component: AddBillReminderConfirmationComponent;
  let fixture: ComponentFixture<AddBillReminderConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBillReminderConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBillReminderConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
