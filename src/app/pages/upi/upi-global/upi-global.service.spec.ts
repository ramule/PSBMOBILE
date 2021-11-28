import { TestBed } from '@angular/core/testing';

import { UpiGlobalService } from './upi-global.service';

describe('UpiGlobalService', () => {
  let service: UpiGlobalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpiGlobalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
