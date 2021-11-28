import { TestBed } from '@angular/core/testing';

import { OpenDepositAccountAuthService } from './open-deposit-account-auth.service';

describe('OpenDepositAccountAuthService', () => {
  let service: OpenDepositAccountAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenDepositAccountAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
