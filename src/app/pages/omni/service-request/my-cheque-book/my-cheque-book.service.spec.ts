import { TestBed } from '@angular/core/testing';

import { MyChequeBookService } from './my-cheque-book.service';

describe('MyChequeBookService', () => {
  let service: MyChequeBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyChequeBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
