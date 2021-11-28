import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeBillpayComponent } from './recharge-billpay.component';

describe('RechargeBillpayComponent', () => {
  let component: RechargeBillpayComponent;
  let fixture: ComponentFixture<RechargeBillpayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechargeBillpayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RechargeBillpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
