import { TestBed } from '@angular/core/testing';

import { SetMpinService } from './set-mpin.service';

describe('ContactUsService', () => {
  let service: SetMpinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetMpinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
