import { TestBed } from '@angular/core/testing';

import { ForgotPasswordUserAuthService } from './forgot-password-user-auth.service';

describe('ForgotPasswordUserAuthService', () => {
  let service: ForgotPasswordUserAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgotPasswordUserAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
