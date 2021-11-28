import { TestBed } from '@angular/core/testing';

import { HotlistCardService } from './hotlist-card.service';

describe('HotlistCardService', () => {
  let service: HotlistCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotlistCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
