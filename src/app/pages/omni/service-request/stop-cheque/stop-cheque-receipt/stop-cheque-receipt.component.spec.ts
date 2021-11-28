import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopChequeReceiptComponent } from './stop-cheque-receipt.component';

describe('StopChequeReceiptComponent', () => {
  let component: StopChequeReceiptComponent;
  let fixture: ComponentFixture<StopChequeReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StopChequeReceiptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StopChequeReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
