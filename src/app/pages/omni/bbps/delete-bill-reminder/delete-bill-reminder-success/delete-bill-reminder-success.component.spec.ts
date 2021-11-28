import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBillReminderSuccessComponent } from './delete-bill-reminder-success.component';

describe('DeleteBillReminderSuccessComponent', () => {
  let component: DeleteBillReminderSuccessComponent;
  let fixture: ComponentFixture<DeleteBillReminderSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteBillReminderSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBillReminderSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
