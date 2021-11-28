import { TestBed } from '@angular/core/testing';

import { MydepositeService } from './mydeposite.service';

describe('MydepositeService', () => {
  let service: MydepositeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MydepositeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
