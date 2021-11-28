import { TestBed } from '@angular/core/testing';

import { MobilePrepaidServiceService } from './mobile-prepaid-service.service';

describe('MobilePrepaidServiceService', () => {
  let service: MobilePrepaidServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobilePrepaidServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
