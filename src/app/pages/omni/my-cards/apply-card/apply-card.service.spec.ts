import { TestBed } from '@angular/core/testing';

import { ApplyCardService } from './apply-card.service';

describe('ApplyCardService', () => {
  let service: ApplyCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplyCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
