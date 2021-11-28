import { TestBed } from '@angular/core/testing';

import { DelinkAccountService } from './delink-account.service';

describe('DelinkAccountService', () => {
  let service: DelinkAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DelinkAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
