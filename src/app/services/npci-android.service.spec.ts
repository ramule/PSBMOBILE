import { TestBed } from '@angular/core/testing';

import { NpciAndroidService } from './npci-android.service';

describe('NpciAndroidService', () => {
  let service: NpciAndroidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NpciAndroidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
