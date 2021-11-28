import { TestBed } from '@angular/core/testing';

import { AccountOpeningBasicDetailsService } from './account-opening-basic-details.service';

describe('AccountOpeningBasicDetailsService', () => {
  let service: AccountOpeningBasicDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountOpeningBasicDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
