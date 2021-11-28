import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenDepositAccountSuccessReceiptComponent } from './open-deposit-account-success-receipt.component';

describe('OpenDepositAccountSuccessReceiptComponent', () => {
  let component: OpenDepositAccountSuccessReceiptComponent;
  let fixture: ComponentFixture<OpenDepositAccountSuccessReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenDepositAccountSuccessReceiptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenDepositAccountSuccessReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
