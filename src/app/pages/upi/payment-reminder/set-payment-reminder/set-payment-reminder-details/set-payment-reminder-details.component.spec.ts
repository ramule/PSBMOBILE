import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPaymentReminderDetailsComponent } from './set-payment-reminder-details.component';

describe('SetPaymentReminderDetailsComponent', () => {
  let component: SetPaymentReminderDetailsComponent;
  let fixture: ComponentFixture<SetPaymentReminderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetPaymentReminderDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetPaymentReminderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
