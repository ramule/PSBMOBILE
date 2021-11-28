import { TestBed } from '@angular/core/testing';

import { SetNewMpinService } from './set-new-mpin.service';

describe('SetNewMpinService', () => {
  let service: SetNewMpinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetNewMpinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
