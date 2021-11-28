import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPaymentReminderSuccessComponent } from './set-payment-reminder-success.component';

describe('SetPaymentReminderSuccessComponent', () => {
  let component: SetPaymentReminderSuccessComponent;
  let fixture: ComponentFixture<SetPaymentReminderSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetPaymentReminderSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetPaymentReminderSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
