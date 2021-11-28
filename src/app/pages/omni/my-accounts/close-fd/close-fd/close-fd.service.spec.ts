import { TestBed } from '@angular/core/testing';

import { CloseFdService } from './close-fd.service';

describe('CloseFdService', () => {
  let service: CloseFdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloseFdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
