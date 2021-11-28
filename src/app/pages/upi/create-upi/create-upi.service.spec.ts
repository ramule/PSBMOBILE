import { TestBed } from '@angular/core/testing';

import { CreateUpiService } from './create-upi.service';

describe('CreateUpiService', () => {
  let service: CreateUpiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateUpiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
