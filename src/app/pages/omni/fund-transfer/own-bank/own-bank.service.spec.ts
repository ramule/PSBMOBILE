import { TestBed } from '@angular/core/testing';

import { OwnBankService } from './own-bank.service';

describe('OwnBankService', () => {
  let service: OwnBankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnBankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
