import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendMoneyLoanComponent } from './send-money-loan.component';

describe('SendMoneyLoanComponent', () => {
  let component: SendMoneyLoanComponent;
  let fixture: ComponentFixture<SendMoneyLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendMoneyLoanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendMoneyLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
