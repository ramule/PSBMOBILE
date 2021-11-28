import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBillReminderConfirmationComponent } from './edit-bill-reminder-confirmation.component';

describe('EditBillReminderConfirmationComponent', () => {
  let component: EditBillReminderConfirmationComponent;
  let fixture: ComponentFixture<EditBillReminderConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBillReminderConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBillReminderConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
