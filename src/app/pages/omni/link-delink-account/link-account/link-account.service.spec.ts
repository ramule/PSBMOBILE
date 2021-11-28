import { TestBed } from '@angular/core/testing';

import { LinkAccountService } from './link-account.service';

describe('LinkAccountService', () => {
  let service: LinkAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinkAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
