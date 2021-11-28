import { TestBed } from '@angular/core/testing';

import { InwardChequeInquiryService } from './inward-cheque-inquiry.service';

describe('InwardChequeInquiryService', () => {
  let service: InwardChequeInquiryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InwardChequeInquiryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
