import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOpeningBranchDetailsComponent } from './account-opening-branch-details.component';

describe('AccountOpeningBranchDetailsComponent', () => {
  let component: AccountOpeningBranchDetailsComponent;
  let fixture: ComponentFixture<AccountOpeningBranchDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountOpeningBranchDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountOpeningBranchDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
