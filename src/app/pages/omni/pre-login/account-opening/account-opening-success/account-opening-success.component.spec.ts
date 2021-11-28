import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOpeningSuccessComponent } from './account-opening-success.component';

describe('AccountOpeningSuccessComponent', () => {
  let component: AccountOpeningSuccessComponent;
  let fixture: ComponentFixture<AccountOpeningSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountOpeningSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountOpeningSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
