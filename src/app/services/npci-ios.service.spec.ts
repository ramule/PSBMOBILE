import { TestBed } from '@angular/core/testing';

import { NpciIosService } from './npci-ios.service';

describe('NpciIosService', () => {
  let service: NpciIosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NpciIosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
