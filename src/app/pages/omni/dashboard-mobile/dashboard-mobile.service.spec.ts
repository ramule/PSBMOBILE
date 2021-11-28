import { TestBed } from '@angular/core/testing';

import { DashboardMobileService } from './dashboard-mobile.service';

describe('DashboardMobileService', () => {
  let service: DashboardMobileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardMobileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
