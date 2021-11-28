import { TestBed } from '@angular/core/testing';

import { AddNomineeDetailsService } from './add-nominee-details.service';

describe('AddNomineeDetailsService', () => {
  let service: AddNomineeDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddNomineeDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
