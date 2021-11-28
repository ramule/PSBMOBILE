import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOpeningBasicDetailsComponent } from './account-opening-basic-details.component';

describe('AccountOpeningBasicDetailsComponent', () => {
  let component: AccountOpeningBasicDetailsComponent;
  let fixture: ComponentFixture<AccountOpeningBasicDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountOpeningBasicDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountOpeningBasicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
