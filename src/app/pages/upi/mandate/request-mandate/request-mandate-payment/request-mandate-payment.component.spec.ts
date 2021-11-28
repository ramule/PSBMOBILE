import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestMandatePaymentComponent } from './request-mandate-payment.component';

describe('RequestMandatePaymentComponent', () => {
  let component: RequestMandatePaymentComponent;
  let fixture: ComponentFixture<RequestMandatePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestMandatePaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestMandatePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
