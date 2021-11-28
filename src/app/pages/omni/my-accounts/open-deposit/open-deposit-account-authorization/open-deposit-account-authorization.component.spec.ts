import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenDepositAccountAuthorizationComponent } from './open-deposit-account-authorization.component';

describe('OpenDepositAccountAuthorizationComponent', () => {
  let component: OpenDepositAccountAuthorizationComponent;
  let fixture: ComponentFixture<OpenDepositAccountAuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenDepositAccountAuthorizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenDepositAccountAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
