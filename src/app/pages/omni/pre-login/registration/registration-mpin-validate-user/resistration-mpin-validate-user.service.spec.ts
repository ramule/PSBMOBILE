import { TestBed } from '@angular/core/testing';

import { ResistrationMpinValidateUserService } from './resistration-mpin-validate-user.service';

describe('ResistrationMpinValidateUserService', () => {
  let service: ResistrationMpinValidateUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResistrationMpinValidateUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
