import { TestBed } from '@angular/core/testing';

import { SelectSimService } from './select-sim.service';

describe('SmsVerificationService', () => {
  let service: SelectSimService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectSimService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
