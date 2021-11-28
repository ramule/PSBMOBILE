import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBillReminderSuccessComponent } from './add-bill-reminder-success.component';

describe('AddBillReminderSuccessComponent', () => {
  let component: AddBillReminderSuccessComponent;
  let fixture: ComponentFixture<AddBillReminderSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBillReminderSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBillReminderSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
