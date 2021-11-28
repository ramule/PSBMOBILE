import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOpeningAccountSelectionComponent } from './account-opening-account-selection.component';

describe('AccountOpeningAccountSelectionComponent', () => {
  let component: AccountOpeningAccountSelectionComponent;
  let fixture: ComponentFixture<AccountOpeningAccountSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountOpeningAccountSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountOpeningAccountSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
