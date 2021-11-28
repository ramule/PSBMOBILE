import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationalPaymentSuccessComponent } from './international-payment-success.component';

describe('InternationalPaymentSuccessComponent', () => {
  let component: InternationalPaymentSuccessComponent;
  let fixture: ComponentFixture<InternationalPaymentSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternationalPaymentSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternationalPaymentSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
