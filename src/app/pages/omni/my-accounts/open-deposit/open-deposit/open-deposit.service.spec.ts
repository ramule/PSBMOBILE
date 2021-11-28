import { TestBed } from '@angular/core/testing';

import { OpenDepositService } from './open-deposit.service';

describe('OpenDepositService', () => {
  let service: OpenDepositService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenDepositService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
