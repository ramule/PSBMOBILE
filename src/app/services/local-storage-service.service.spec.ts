import { TestBed } from '@angular/core/testing';

import { LocalStorageService} from './local-storage-service.service';

describe('LocalStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalStorageService = TestBed.get(LocalStorageService);
    expect(service).toBeTruthy();
  });
});
