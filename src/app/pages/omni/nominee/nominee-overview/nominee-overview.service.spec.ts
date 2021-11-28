import { TestBed } from '@angular/core/testing';

import { NomineeOverviewService } from './nominee-overview.service';

describe('NomineeOverviewService', () => {
  let service: NomineeOverviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NomineeOverviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
