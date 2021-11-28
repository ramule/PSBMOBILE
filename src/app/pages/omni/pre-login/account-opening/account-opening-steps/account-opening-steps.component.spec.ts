import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOpeningStepsComponent } from './account-opening-steps.component';

describe('AccountOpeningStepsComponent', () => {
  let component: AccountOpeningStepsComponent;
  let fixture: ComponentFixture<AccountOpeningStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountOpeningStepsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountOpeningStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
