import { TestBed } from '@angular/core/testing';

import { AccountOpeningLandingService } from './account-opening-landing.service';

describe('AccountOpeningLandingService', () => {
  let service: AccountOpeningLandingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountOpeningLandingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
