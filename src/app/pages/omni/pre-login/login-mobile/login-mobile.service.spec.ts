import { TestBed } from '@angular/core/testing';

import { LoginMobileService } from './login-mobile.service';

describe('LoginMobileService', () => {
  let service: LoginMobileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginMobileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
