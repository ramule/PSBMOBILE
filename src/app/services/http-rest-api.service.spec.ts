import { TestBed } from '@angular/core/testing';

import { HttpRestApiService } from './http-rest-api.service';

describe('HttpRestApiService', () => {
  let service: HttpRestApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpRestApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
