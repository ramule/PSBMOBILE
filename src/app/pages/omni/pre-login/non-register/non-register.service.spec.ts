import { TestBed } from '@angular/core/testing';

import { NonRegisterService } from './non-register.service';

describe('NonRegisterService', () => {
  let service: NonRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NonRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
