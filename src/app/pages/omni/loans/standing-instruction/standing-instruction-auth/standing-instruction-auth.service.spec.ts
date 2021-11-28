import { TestBed } from '@angular/core/testing';

import { StandingInstructionAuthService } from './standing-instruction-auth.service';

describe('StandingInstructionAuthService', () => {
  let service: StandingInstructionAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StandingInstructionAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
