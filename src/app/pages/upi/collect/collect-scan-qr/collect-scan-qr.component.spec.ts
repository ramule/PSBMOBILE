import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectScanQrComponent } from './collect-scan-qr.component';

describe('CollectScanQrComponent', () => {
  let component: CollectScanQrComponent;
  let fixture: ComponentFixture<CollectScanQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectScanQrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectScanQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
