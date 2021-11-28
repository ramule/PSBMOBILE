import { TestBed } from '@angular/core/testing';

import { ForgotUsernameService } from './forgot-username.service';

describe('ForgotUsernameService', () => {
  let service: ForgotUsernameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgotUsernameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
