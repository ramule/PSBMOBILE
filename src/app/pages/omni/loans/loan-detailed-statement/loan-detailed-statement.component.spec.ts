import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanDetailedStatementComponent } from './loan-detailed-statement.component';

describe('LoanDetailedStatementComponent', () => {
  let component: LoanDetailedStatementComponent;
  let fixture: ComponentFixture<LoanDetailedStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanDetailedStatementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanDetailedStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
