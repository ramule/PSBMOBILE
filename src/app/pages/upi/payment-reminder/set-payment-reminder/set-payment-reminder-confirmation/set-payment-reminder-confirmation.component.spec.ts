import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPaymentReminderConfirmationComponent } from './set-payment-reminder-confirmation.component';

describe('SetPaymentReminderConfirmationComponent', () => {
  let component: SetPaymentReminderConfirmationComponent;
  let fixture: ComponentFixture<SetPaymentReminderConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetPaymentReminderConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetPaymentReminderConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
