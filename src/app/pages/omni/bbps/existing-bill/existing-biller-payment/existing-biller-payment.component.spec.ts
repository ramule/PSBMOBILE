import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingBillerPaymentComponent } from './existing-biller-payment.component';

describe('ExistingBillerPaymentComponent', () => {
  let component: ExistingBillerPaymentComponent;
  let fixture: ComponentFixture<ExistingBillerPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExistingBillerPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingBillerPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
