import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanQrIdListComponent } from './scan-qr-id-list.component';

describe('ScanQrIdListComponent', () => {
  let component: ScanQrIdListComponent;
  let fixture: ComponentFixture<ScanQrIdListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScanQrIdListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanQrIdListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
