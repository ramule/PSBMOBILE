import { TestBed } from '@angular/core/testing';

import { OtherBankService } from './other-bank.service';

describe('OtherBankService', () => {
  let service: OtherBankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtherBankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
