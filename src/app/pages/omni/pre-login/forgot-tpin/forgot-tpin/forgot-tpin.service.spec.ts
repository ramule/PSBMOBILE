import { TestBed } from '@angular/core/testing';

import { ForgotTpinService } from './forgot-tpin.service';

describe('ForgotTpinService', () => {
  let service: ForgotTpinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgotTpinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
