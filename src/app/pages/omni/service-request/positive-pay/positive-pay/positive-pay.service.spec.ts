import { TestBed } from '@angular/core/testing';

import { PositivePayService } from './positive-pay.service';

describe('PositivePayService', () => {
  let service: PositivePayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PositivePayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
