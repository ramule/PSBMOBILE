import { TestBed } from '@angular/core/testing';

import { UpiLoginService } from './upi-login.service';

describe('ContactUsService', () => {
  let service: UpiLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpiLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
