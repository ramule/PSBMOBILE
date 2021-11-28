import { TestBed } from '@angular/core/testing';

import { ModifyStandingInstructionService } from './modify-standing-instruction.service';

describe('ModifyStandingInstructionService', () => {
  let service: ModifyStandingInstructionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModifyStandingInstructionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
