import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationalPaymentConfirmationComponent } from './international-payment-confirmation.component';

describe('InternationalPaymentConfirmationComponent', () => {
  let component: InternationalPaymentConfirmationComponent;
  let fixture: ComponentFixture<InternationalPaymentConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternationalPaymentConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternationalPaymentConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
