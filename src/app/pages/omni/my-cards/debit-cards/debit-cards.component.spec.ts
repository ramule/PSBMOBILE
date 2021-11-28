import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitCardsComponent } from './debit-cards.component';

describe('DebitCardsComponent', () => {
  let component: DebitCardsComponent;
  let fixture: ComponentFixture<DebitCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebitCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebitCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
