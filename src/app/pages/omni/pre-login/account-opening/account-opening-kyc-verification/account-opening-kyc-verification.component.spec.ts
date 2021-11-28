import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOpeningKycVerificationComponent } from './account-opening-kyc-verification.component';

describe('AccountOpeningKycVerificationComponent', () => {
  let component: AccountOpeningKycVerificationComponent;
  let fixture: ComponentFixture<AccountOpeningKycVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountOpeningKycVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountOpeningKycVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
