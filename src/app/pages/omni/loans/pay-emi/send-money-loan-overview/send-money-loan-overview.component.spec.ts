import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendMoneyLoanOverviewComponent } from './send-money-loan-overview.component';

describe('SendMoneyLoanOverviewComponent', () => {
  let component: SendMoneyLoanOverviewComponent;
  let fixture: ComponentFixture<SendMoneyLoanOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendMoneyLoanOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendMoneyLoanOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
