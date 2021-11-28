import { TestBed } from '@angular/core/testing';

import { AccountOpeningKycVerificationService } from './account-opening-kyc-verification.service';

describe('AccountOpeningKycVerificationService', () => {
  let service: AccountOpeningKycVerificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountOpeningKycVerificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
