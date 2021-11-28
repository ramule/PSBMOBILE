import { TestBed } from '@angular/core/testing';

import { RegisterNewBillerService } from './register-new-biller.service';

describe('RegisterNewBillerService', () => {
  let service: RegisterNewBillerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterNewBillerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
