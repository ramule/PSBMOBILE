import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GasBillPaymentComponent } from './gas-bill-payment.component';

describe('GasBillPaymentComponent', () => {
  let component: GasBillPaymentComponent;
  let fixture: ComponentFixture<GasBillPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GasBillPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GasBillPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
