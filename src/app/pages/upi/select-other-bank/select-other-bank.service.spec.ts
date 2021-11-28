import { TestBed } from '@angular/core/testing';

import { SelectOtherBankService } from './select-other-bank.service';

describe('SelectOtherBankService', () => {
  let service: SelectOtherBankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectOtherBankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
