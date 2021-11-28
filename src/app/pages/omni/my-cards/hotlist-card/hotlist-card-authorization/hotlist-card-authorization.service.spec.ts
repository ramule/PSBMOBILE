import { TestBed } from '@angular/core/testing';

import { HotlistCardAuthorizationService } from './hotlist-card-authorization.service';

describe('HotlistCardAuthorizationService', () => {
  let service: HotlistCardAuthorizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotlistCardAuthorizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
