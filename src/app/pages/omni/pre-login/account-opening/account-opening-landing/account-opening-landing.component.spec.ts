import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOpeningLandingComponent } from './account-opening-landing.component';

describe('AccountOpeningLandingComponent', () => {
  let component: AccountOpeningLandingComponent;
  let fixture: ComponentFixture<AccountOpeningLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountOpeningLandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountOpeningLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
