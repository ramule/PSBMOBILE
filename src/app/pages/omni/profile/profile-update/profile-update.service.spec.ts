import { TestBed } from '@angular/core/testing';

import { ProfileUpdateService } from './profile-update.service';

describe('ProfileUpdateService', () => {
  let service: ProfileUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
