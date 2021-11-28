import { TestBed } from '@angular/core/testing';

import { ImpsTransactionStatusService } from './imps-transaction-status.service';

describe('ImpsTransactionStatusService', () => {
  let service: ImpsTransactionStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsTransactionStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
