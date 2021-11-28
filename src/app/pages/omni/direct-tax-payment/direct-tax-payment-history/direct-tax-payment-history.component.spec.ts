import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectTaxPaymentHistoryComponent } from './direct-tax-payment-history.component';

describe('DirectTaxPaymentHistoryComponent', () => {
  let component: DirectTaxPaymentHistoryComponent;
  let fixture: ComponentFixture<DirectTaxPaymentHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectTaxPaymentHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectTaxPaymentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
