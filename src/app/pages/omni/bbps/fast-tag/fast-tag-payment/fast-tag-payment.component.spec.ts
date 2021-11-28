import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FastTagPaymentComponent } from './fast-tag-payment.component';

describe('FastTagPaymentComponent', () => {
  let component: FastTagPaymentComponent;
  let fixture: ComponentFixture<FastTagPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FastTagPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FastTagPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
