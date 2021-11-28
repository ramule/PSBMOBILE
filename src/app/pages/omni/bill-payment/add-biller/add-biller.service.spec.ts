import { TestBed } from '@angular/core/testing';

import { AddBillerService } from './add-biller.service';

describe('AddBillerService', () => {
  let service: AddBillerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddBillerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
