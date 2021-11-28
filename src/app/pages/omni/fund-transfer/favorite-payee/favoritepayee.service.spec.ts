import { TestBed } from '@angular/core/testing';

import { FavoritepayeeService } from './favoritepayee.service';

describe('FavoritepayeeService', () => {
  let service: FavoritepayeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritepayeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
