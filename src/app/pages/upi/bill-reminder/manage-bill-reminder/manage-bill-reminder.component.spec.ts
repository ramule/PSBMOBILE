import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBillReminderComponent } from './manage-bill-reminder.component';

describe('ManageBillReminderComponent', () => {
  let component: ManageBillReminderComponent;
  let fixture: ComponentFixture<ManageBillReminderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageBillReminderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBillReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
