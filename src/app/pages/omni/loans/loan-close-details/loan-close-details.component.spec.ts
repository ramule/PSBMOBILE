import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanCloseDetailsComponent } from './loan-close-details.component';

describe('LoanCloseDetailsComponent', () => {
  let component: LoanCloseDetailsComponent;
  let fixture: ComponentFixture<LoanCloseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanCloseDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanCloseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
