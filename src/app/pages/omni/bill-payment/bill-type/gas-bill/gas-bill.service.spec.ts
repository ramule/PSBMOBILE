import { TestBed } from '@angular/core/testing';

import { GasBillService } from './gas-bill.service';

describe('GasBillService', () => {
  let service: GasBillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GasBillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
