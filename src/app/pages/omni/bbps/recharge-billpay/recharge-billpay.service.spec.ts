import { TestBed } from '@angular/core/testing';

import { RechargeBillpayService } from './recharge-billpay.service';

describe('RechargeBillpayService', () => {
  let service: RechargeBillpayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RechargeBillpayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
