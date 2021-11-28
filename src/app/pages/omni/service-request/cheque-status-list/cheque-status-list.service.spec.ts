import { TestBed } from '@angular/core/testing';

import { ChequeStatusListService } from './cheque-status-list.service';

describe('ChequeStatusListService', () => {
  let service: ChequeStatusListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChequeStatusListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
