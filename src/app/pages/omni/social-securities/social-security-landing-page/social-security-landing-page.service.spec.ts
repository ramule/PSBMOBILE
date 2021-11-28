import { TestBed } from '@angular/core/testing';

import { SocialSecurityLandingPageService } from './social-security-landing-page.service';

describe('SocialSecurityLandingPageService', () => {
  let service: SocialSecurityLandingPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocialSecurityLandingPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
