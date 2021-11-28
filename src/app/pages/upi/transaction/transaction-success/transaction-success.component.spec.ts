import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionSuccessComponent } from './transaction-success.component';

describe('TransactionSuccessComponent', () => {
  let component: TransactionSuccessComponent;
  let fixture: ComponentFixture<TransactionSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
