import { TestBed } from '@angular/core/testing';

import { ExistingBillPayemtServiceService } from './existing-bill-payemt-service.service';

describe('ExistingBillPayemtServiceService', () => {
  let service: ExistingBillPayemtServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExistingBillPayemtServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
