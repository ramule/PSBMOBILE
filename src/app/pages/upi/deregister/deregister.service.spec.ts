import { TestBed } from '@angular/core/testing';

import { DeregisterService } from './deregister.service';

describe('DeregisterService', () => {
  let service: DeregisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeregisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
