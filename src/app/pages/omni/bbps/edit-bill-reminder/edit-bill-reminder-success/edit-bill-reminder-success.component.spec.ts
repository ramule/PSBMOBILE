import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBillReminderSuccessComponent } from './edit-bill-reminder-success.component';

describe('EditBillReminderSuccessComponent', () => {
  let component: EditBillReminderSuccessComponent;
  let fixture: ComponentFixture<EditBillReminderSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBillReminderSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBillReminderSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
