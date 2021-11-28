import { TestBed } from '@angular/core/testing';

import { RegistrationMpinService } from './registration-mpin.service';

describe('RegistrationMpinService', () => {
  let service: RegistrationMpinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrationMpinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
