import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanQrPaymentComponent } from './scan-qr-payment.component';

describe('ScanQrPaymentComponent', () => {
  let component: ScanQrPaymentComponent;
  let fixture: ComponentFixture<ScanQrPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScanQrPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanQrPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
