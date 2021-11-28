import { TestBed } from '@angular/core/testing';

import { StandingInstructionListService } from './standing-instruction-list.service';

describe('StandingInstructionListService', () => {
  let service: StandingInstructionListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StandingInstructionListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
