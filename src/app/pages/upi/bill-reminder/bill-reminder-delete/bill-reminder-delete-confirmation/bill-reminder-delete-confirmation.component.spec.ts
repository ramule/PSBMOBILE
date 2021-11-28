import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillReminderDeleteConfirmationComponent } from './bill-reminder-delete-confirmation.component';

describe('BillReminderDeleteConfirmationComponent', () => {
  let component: BillReminderDeleteConfirmationComponent;
  let fixture: ComponentFixture<BillReminderDeleteConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillReminderDeleteConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillReminderDeleteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
