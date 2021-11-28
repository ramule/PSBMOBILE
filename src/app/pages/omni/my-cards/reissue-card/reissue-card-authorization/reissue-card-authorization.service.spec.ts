import { TestBed } from '@angular/core/testing';

import { ReissueCardAuthorizationService } from './reissue-card-authorization.service';

describe('ReissueCardAuthorizationService', () => {
  let service: ReissueCardAuthorizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReissueCardAuthorizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
