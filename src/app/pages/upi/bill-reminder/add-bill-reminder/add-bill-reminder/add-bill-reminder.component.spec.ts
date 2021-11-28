import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBillReminderComponent } from './add-bill-reminder.component';

describe('AddBillReminderComponent', () => {
  let component: AddBillReminderComponent;
  let fixture: ComponentFixture<AddBillReminderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBillReminderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBillReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
