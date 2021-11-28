import { TestBed } from '@angular/core/testing';

import { NomineeAuthorizationService } from './nominee-authorization.service';

describe('NomineeAuthorizationService', () => {
  let service: NomineeAuthorizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NomineeAuthorizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
