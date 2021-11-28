import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOpeningNomineeDetailsComponent } from './account-opening-nominee-details.component';

describe('AccountOpeningNomineeDetailsComponent', () => {
  let component: AccountOpeningNomineeDetailsComponent;
  let fixture: ComponentFixture<AccountOpeningNomineeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountOpeningNomineeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountOpeningNomineeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
