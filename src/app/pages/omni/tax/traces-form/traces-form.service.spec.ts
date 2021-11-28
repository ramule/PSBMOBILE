import { TestBed } from '@angular/core/testing';

import { TracesFormService } from './traces-form.service';

describe('TracesFormService', () => {
  let service: TracesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TracesFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
