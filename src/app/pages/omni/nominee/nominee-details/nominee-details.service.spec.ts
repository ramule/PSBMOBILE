import { TestBed } from '@angular/core/testing';

import { NomineeDetailsService } from './nominee-details.service';

describe('NomineeDetailsService', () => {
  let service: NomineeDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NomineeDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
