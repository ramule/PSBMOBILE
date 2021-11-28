import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanClosureComponent } from './loan-closure.component';

describe('LoanClosureComponent', () => {
  let component: LoanClosureComponent;
  let fixture: ComponentFixture<LoanClosureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanClosureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanClosureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
