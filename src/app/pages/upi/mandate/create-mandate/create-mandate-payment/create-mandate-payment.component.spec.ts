import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMandatePaymentComponent } from './create-mandate-payment.component';

describe('CreateMandatePaymentComponent', () => {
  let component: CreateMandatePaymentComponent;
  let fixture: ComponentFixture<CreateMandatePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMandatePaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMandatePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
