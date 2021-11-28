import { TestBed } from '@angular/core/testing';

import { StopChequeAuthorizationService } from './stop-cheque-authorization.service';

describe('StopChequeAuthorizationService', () => {
  let service: StopChequeAuthorizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StopChequeAuthorizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
