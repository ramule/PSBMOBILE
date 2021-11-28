import { TestBed } from '@angular/core/testing';

import { FormFifteenGhService } from './form-fifteen-gh.service';

describe('FormFifteenGhService', () => {
  let service: FormFifteenGhService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormFifteenGhService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
