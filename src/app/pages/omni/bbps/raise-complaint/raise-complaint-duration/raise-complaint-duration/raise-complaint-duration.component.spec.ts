import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiseComplaintDurationComponent } from './raise-complaint-duration.component';

describe('RaiseComplaintDurationComponent', () => {
  let component: RaiseComplaintDurationComponent;
  let fixture: ComponentFixture<RaiseComplaintDurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaiseComplaintDurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaiseComplaintDurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
