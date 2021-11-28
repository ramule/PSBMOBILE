import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiseComplaintConfirmationComponent } from './raise-complaint-confirmation.component';

describe('RaiseComplaintConfirmationComponent', () => {
  let component: RaiseComplaintConfirmationComponent;
  let fixture: ComponentFixture<RaiseComplaintConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaiseComplaintConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaiseComplaintConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
