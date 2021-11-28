import { TestBed } from '@angular/core/testing';

import { FaqOmniService } from './faq-omni.service';

describe('FaqOmniService', () => {
  let service: FaqOmniService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FaqOmniService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
