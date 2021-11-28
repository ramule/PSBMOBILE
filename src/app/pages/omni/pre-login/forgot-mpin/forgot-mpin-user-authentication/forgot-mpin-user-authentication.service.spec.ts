import { TestBed } from '@angular/core/testing';

import { ForgotMpinUserAuthenticationService } from './forgot-mpin-user-authentication.service';

describe('ForgotMpinUserAuthenticationService', () => {
  let service: ForgotMpinUserAuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgotMpinUserAuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
