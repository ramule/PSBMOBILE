import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanQrSuccessComponent } from './scan-qr-success.component';

describe('ScanQrSuccessComponent', () => {
  let component: ScanQrSuccessComponent;
  let fixture: ComponentFixture<ScanQrSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScanQrSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanQrSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
