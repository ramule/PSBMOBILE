import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectTaxPaymentComponent } from './direct-tax-payment.component';

describe('DirectTaxPaymentComponent', () => {
  let component: DirectTaxPaymentComponent;
  let fixture: ComponentFixture<DirectTaxPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectTaxPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectTaxPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
