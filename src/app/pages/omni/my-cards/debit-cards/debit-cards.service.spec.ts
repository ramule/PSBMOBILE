import { TestBed } from '@angular/core/testing';

import { DebitCardsService } from './debit-cards.service';

describe('DebitCardsService', () => {
  let service: DebitCardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DebitCardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
