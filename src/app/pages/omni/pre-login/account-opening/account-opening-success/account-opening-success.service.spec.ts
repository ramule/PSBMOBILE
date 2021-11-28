import { TestBed } from '@angular/core/testing';

import { AccountOpeningSuccessService } from './account-opening-success.service';

describe('AccountOpeningSuccessService', () => {
  let service: AccountOpeningSuccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountOpeningSuccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
