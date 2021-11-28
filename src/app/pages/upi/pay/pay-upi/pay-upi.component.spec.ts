import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayUpiComponent } from './pay-upi.component';

describe('PayUpiComponent', () => {
  let component: PayUpiComponent;
  let fixture: ComponentFixture<PayUpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayUpiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayUpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
