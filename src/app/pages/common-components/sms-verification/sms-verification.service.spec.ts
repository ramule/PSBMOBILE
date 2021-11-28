import { TestBed } from '@angular/core/testing';

import { SmsVerificationService } from './sms-verification.service';

describe('SmsVerificationService', () => {
  let service: SmsVerificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmsVerificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
