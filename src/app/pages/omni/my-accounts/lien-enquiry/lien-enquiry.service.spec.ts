import { TestBed } from '@angular/core/testing';

import { LienEnquiryService } from './lien-enquiry.service';

describe('LienEnquiryService', () => {
  let service: LienEnquiryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LienEnquiryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
