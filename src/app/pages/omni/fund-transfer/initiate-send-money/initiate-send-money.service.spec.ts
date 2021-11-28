import { TestBed } from '@angular/core/testing';

import { InitiateSendMoneyService } from './initiate-send-money.service';

describe('InitiateSendMoneyService', () => {
  let service: InitiateSendMoneyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InitiateSendMoneyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
