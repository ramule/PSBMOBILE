import { TestBed } from '@angular/core/testing';

import { BrowsePlanService } from './browse-plan.service';

describe('BrowsePlanService', () => {
  let service: BrowsePlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrowsePlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
