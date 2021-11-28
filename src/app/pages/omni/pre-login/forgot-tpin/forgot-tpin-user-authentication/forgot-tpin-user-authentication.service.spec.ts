import { TestBed } from '@angular/core/testing';

import { ForgotTpinUserAuthenticationService } from './forgot-tpin-user-authentication.service';

describe('ForgotTpinUserAuthenticationService', () => {
  let service: ForgotTpinUserAuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgotTpinUserAuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
