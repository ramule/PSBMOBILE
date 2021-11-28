import { TestBed } from '@angular/core/testing';

import { RaiseComplainService } from './raise-complain.service';

describe('RaiseComplainService', () => {
  let service: RaiseComplainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RaiseComplainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
