import { TestBed } from '@angular/core/testing';

import { PmjjbyDetailsService } from './pmjjby-details.service';

describe('PmjjbyDetailsService', () => {
  let service: PmjjbyDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PmjjbyDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
