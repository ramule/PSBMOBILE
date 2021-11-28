import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordSetPasswordComponent } from './forgot-password-set-password.component';

describe('ForgotPasswordSetPasswordComponent', () => {
  let component: ForgotPasswordSetPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordSetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordSetPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordSetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
