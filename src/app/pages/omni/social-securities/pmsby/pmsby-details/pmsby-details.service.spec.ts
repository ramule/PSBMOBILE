import { TestBed } from '@angular/core/testing';

import { PmsbyDetailsService } from './pmsby-details.service';

describe('PmsbyDetailsService', () => {
  let service: PmsbyDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PmsbyDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
