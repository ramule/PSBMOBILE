import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBillReminderConfirmationComponent } from './delete-bill-reminder-confirmation.component';

describe('DeleteBillReminderConfirmationComponent', () => {
  let component: DeleteBillReminderConfirmationComponent;
  let fixture: ComponentFixture<DeleteBillReminderConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteBillReminderConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBillReminderConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
