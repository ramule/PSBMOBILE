import { TestBed } from '@angular/core/testing';

import { ApyDetailsService } from './apy-details.service';

describe('ApyDetailsService', () => {
  let service: ApyDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApyDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
