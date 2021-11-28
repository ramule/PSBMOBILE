import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOpeningCreateUpiComponent } from './account-opening-create-upi.component';

describe('AccountOpeningCreateUpiComponent', () => {
  let component: AccountOpeningCreateUpiComponent;
  let fixture: ComponentFixture<AccountOpeningCreateUpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountOpeningCreateUpiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountOpeningCreateUpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
