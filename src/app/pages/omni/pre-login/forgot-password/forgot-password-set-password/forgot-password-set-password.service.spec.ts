import { TestBed } from '@angular/core/testing';

import { ForgotPasswordSetPasswordService } from './forgot-password-set-password.service';

describe('ForgotPasswordSetPasswordService', () => {
  let service: ForgotPasswordSetPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgotPasswordSetPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
