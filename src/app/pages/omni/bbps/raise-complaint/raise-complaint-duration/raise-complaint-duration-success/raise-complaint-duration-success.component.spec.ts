import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiseComplaintDurationSuccessComponent } from './raise-complaint-duration-success.component';

describe('RaiseComplaintDurationSuccessComponent', () => {
  let component: RaiseComplaintDurationSuccessComponent;
  let fixture: ComponentFixture<RaiseComplaintDurationSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaiseComplaintDurationSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaiseComplaintDurationSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
