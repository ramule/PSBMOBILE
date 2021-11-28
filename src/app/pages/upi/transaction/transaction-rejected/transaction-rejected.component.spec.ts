import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionRejectedComponent } from './transaction-rejected.component';

describe('TransactionRejectedComponent', () => {
  let component: TransactionRejectedComponent;
  let fixture: ComponentFixture<TransactionRejectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionRejectedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
