import { TestBed } from '@angular/core/testing';

import { TransactionListService } from './transaction-list.service';

describe('ContactUsService', () => {
  let service: TransactionListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
