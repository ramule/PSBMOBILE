import { TestBed } from '@angular/core/testing';

import { StopChequesService } from './stop-cheques.service';

describe('StopChequesService', () => {
  let service: StopChequesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StopChequesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
