import { TestBed } from '@angular/core/testing';

import { ForgotPasswordUserDetailsService } from './forgot-password-user-details.service';

describe('ForgotPasswordUserDetailsService', () => {
  let service: ForgotPasswordUserDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgotPasswordUserDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
