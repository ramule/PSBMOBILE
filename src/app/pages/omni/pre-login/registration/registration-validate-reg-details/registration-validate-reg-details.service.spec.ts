import { TestBed } from '@angular/core/testing';

import { RegistrationValidateRegService } from './registration-validate-reg-details.service';

describe('RegistrationValidateRegService', () => {
  let service: RegistrationValidateRegService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrationValidateRegService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
