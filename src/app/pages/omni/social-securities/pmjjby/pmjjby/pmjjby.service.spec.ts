import { TestBed } from '@angular/core/testing';

import { PmjjbyService } from './pmjjby.service';

describe('PmjjbyService', () => {
  let service: PmjjbyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PmjjbyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
