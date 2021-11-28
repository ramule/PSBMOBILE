import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOpeningAdditonalDetailsComponent } from './account-opening-additonal-details.component';

describe('AccountOpeningAdditonalDetailsComponent', () => {
  let component: AccountOpeningAdditonalDetailsComponent;
  let fixture: ComponentFixture<AccountOpeningAdditonalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountOpeningAdditonalDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountOpeningAdditonalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
