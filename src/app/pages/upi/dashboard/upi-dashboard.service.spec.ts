import { TestBed } from '@angular/core/testing';

import { UpiDashboardService } from './upi-dashboard.service';

describe('SmsVerificationService', () => {
  let service: UpiDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpiDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
