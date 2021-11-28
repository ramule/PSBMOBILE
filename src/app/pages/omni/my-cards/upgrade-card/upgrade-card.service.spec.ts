import { TestBed } from '@angular/core/testing';

import { UpgradeCardService } from './upgrade-card.service';

describe('UpgradeCardService', () => {
  let service: UpgradeCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpgradeCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
