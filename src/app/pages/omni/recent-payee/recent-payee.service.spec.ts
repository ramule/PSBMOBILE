import { TestBed } from '@angular/core/testing';

import { RecentPayeeService } from './recent-payee.service';

describe('RecentPayeeService', () => {
  let service: RecentPayeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecentPayeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
