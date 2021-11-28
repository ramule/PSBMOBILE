import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionPinComponent } from './transaction-pin.component';

describe('TransactionPinComponent', () => {
  let component: TransactionPinComponent;
  let fixture: ComponentFixture<TransactionPinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionPinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
