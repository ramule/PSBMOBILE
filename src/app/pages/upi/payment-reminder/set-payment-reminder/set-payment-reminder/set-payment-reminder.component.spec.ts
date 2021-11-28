import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPaymentReminderComponent } from './set-payment-reminder.component';

describe('SetPaymentReminderComponent', () => {
  let component: SetPaymentReminderComponent;
  let fixture: ComponentFixture<SetPaymentReminderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetPaymentReminderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetPaymentReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
