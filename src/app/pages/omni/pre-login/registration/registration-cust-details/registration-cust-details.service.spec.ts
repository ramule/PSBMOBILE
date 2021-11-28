import { TestBed } from '@angular/core/testing';

import { RegistrationCustDetailsService } from './registration-cust-details.service';

describe('RegistrationCustDetailsService', () => {
  let service: RegistrationCustDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrationCustDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
