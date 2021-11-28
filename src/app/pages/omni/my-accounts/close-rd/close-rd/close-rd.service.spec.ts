import { TestBed } from '@angular/core/testing';

import { CloseRdService } from './close-rd.service';

describe('CloseRdService', () => {
  let service: CloseRdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloseRdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
