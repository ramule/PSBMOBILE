import { TestBed } from '@angular/core/testing';

import { StandingInstructionService } from './standing-instruction.service';

describe('StandingInstructionService', () => {
  let service: StandingInstructionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StandingInstructionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
