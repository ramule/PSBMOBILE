import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillReminderDeleteSuccessComponent } from './bill-reminder-delete-success.component';

describe('BillReminderDeleteSuccessComponent', () => {
  let component: BillReminderDeleteSuccessComponent;
  let fixture: ComponentFixture<BillReminderDeleteSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillReminderDeleteSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillReminderDeleteSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
