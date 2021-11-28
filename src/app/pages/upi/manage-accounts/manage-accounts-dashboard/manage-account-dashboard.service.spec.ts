import { TestBed } from '@angular/core/testing';

import { ManageAccountDashboardService } from './manage-account-dashboard.service';

describe('ManageAccountDashboardService', () => {
  let service: ManageAccountDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageAccountDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
