import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingBillReminderComponent } from './pending-bill-reminder.component';

describe('PendingBillReminderComponent', () => {
  let component: PendingBillReminderComponent;
  let fixture: ComponentFixture<PendingBillReminderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingBillReminderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingBillReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
