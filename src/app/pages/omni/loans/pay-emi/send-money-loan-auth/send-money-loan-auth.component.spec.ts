import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendMoneyLoanAuthComponent } from './send-money-loan-auth.component';

describe('SendMoneyLoanAuthComponent', () => {
  let component: SendMoneyLoanAuthComponent;
  let fixture: ComponentFixture<SendMoneyLoanAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendMoneyLoanAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendMoneyLoanAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
