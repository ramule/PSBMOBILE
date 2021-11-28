import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferReceiptComponent } from './transfer-receipt.component';

describe('TransferReceiptComponent', () => {
  let component: TransferReceiptComponent;
  let fixture: ComponentFixture<TransferReceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferReceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
