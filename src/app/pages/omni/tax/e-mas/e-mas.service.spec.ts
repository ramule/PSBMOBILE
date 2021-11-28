import { TestBed } from '@angular/core/testing';

import { EMasService } from './e-mas.service';

describe('EMasService', () => {
  let service: EMasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EMasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
