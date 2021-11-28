import { TestBed } from '@angular/core/testing';

import { AddPayeeService } from './add-payee.service';

describe('AddPayeeService', () => {
  let service: AddPayeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddPayeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
