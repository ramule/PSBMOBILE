import { TestBed } from '@angular/core/testing';

import { BillPaymnetService } from './bill-paymnet.service';

describe('BillPaymnetService', () => {
  let service: BillPaymnetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillPaymnetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
