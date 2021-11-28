import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfTransferPaymentComponent } from './self-transfer-payment.component';

describe('SelfTransferPaymentComponent', () => {
  let component: SelfTransferPaymentComponent;
  let fixture: ComponentFixture<SelfTransferPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfTransferPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfTransferPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
