import { TestBed } from '@angular/core/testing';

import { TdsCertificateService } from './tds-certificate.service';

describe('TdsCertificateService', () => {
  let service: TdsCertificateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TdsCertificateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
