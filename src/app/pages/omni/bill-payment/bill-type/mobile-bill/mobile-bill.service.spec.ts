import { TestBed } from '@angular/core/testing';

import { MobileBillService } from './mobile-bill.service';

describe('MobileBillService', () => {
  let service: MobileBillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobileBillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
