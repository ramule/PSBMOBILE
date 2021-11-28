import { TestBed } from '@angular/core/testing';

import { ReissueCardService } from './reissue-card.service';

describe('ReissueCardService', () => {
  let service: ReissueCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReissueCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
