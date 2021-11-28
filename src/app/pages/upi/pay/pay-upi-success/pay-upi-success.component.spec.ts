import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayUpiSuccessComponent } from './pay-upi-success.component';

describe('PayUpiSuccessComponent', () => {
  let component: PayUpiSuccessComponent;
  let fixture: ComponentFixture<PayUpiSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayUpiSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayUpiSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
