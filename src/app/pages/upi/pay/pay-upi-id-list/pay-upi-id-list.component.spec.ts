import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayUpiIdListComponent } from './pay-upi-id-list.component';

describe('PayUpiIdListComponent', () => {
  let component: PayUpiIdListComponent;
  let fixture: ComponentFixture<PayUpiIdListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayUpiIdListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayUpiIdListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
