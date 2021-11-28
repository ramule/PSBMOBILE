import { TestBed } from '@angular/core/testing';

import { InstantPayService } from './instant-pay.service';

describe('InstantPayService', () => {
  let service: InstantPayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstantPayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
