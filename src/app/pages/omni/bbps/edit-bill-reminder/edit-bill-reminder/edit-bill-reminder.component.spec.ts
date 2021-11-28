import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBillReminderComponent } from './edit-bill-reminder.component';

describe('EditBillReminderComponent', () => {
  let component: EditBillReminderComponent;
  let fixture: ComponentFixture<EditBillReminderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBillReminderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBillReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
