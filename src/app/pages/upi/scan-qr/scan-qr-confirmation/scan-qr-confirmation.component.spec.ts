import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanQrConfirmationComponent } from './scan-qr-confirmation.component';

describe('ApproveMandateConfirmationComponent', () => {
  let component: ScanQrConfirmationComponent;
  let fixture: ComponentFixture<ScanQrConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScanQrConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanQrConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
