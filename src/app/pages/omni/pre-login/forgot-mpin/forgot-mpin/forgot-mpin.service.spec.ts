import { TestBed } from '@angular/core/testing';

import { ForgotMpinService } from './forgot-mpin.service';

describe('ForgotMpinService', () => {
  let service: ForgotMpinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgotMpinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
