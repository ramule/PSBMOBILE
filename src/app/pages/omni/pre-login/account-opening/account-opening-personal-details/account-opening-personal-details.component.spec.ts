import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOpeningPersonalDetailsComponent } from './account-opening-personal-details.component';

describe('AccountOpeningPersonalDetailsComponent', () => {
  let component: AccountOpeningPersonalDetailsComponent;
  let fixture: ComponentFixture<AccountOpeningPersonalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountOpeningPersonalDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountOpeningPersonalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
