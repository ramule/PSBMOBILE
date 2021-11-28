import { TestBed } from '@angular/core/testing';

import { ExistingGetBillService } from './existing-get-bill.service';

describe('ExistingGetBillService', () => {
  let service: ExistingGetBillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExistingGetBillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
