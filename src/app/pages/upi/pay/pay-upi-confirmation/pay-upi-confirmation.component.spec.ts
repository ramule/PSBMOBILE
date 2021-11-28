import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayUpiConfirmationComponent } from './pay-upi-confirmation.component';

describe('ApproveMandateConfirmationComponent', () => {
  let component: PayUpiConfirmationComponent;
  let fixture: ComponentFixture<PayUpiConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayUpiConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayUpiConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
