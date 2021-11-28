import { TestBed } from '@angular/core/testing';

import { OpenRdAccountAuthService } from './open-rd-account-auth.service';

describe('OpenRdAccountAuthService', () => {
  let service: OpenRdAccountAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenRdAccountAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
