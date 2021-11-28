import { TestBed } from '@angular/core/testing';

import { PendingRequestService } from './pending-request.service';

describe('PendingRequestService', () => {
  let service: PendingRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PendingRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
