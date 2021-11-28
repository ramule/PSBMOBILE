import { TestBed } from '@angular/core/testing';

import { BbpsService } from './bbps.service';

describe('BbpsService', () => {
  let service: BbpsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BbpsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
