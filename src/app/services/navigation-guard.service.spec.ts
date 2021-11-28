import { TestBed } from '@angular/core/testing';

import { NavigationGuardService } from './navigation-guard.service';

describe('NavigationGuardService', () => {
  let service: NavigationGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
