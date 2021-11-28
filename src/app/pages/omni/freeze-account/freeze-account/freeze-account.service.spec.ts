import { TestBed } from '@angular/core/testing';

import { FreezeAccountService } from './freeze-account.service';

describe('FreezeAccountService', () => {
  let service: FreezeAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FreezeAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
