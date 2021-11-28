import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordUserAuthComponent } from './forgot-password-user-auth.component';

describe('ForgotPasswordUserAuthComponent', () => {
  let component: ForgotPasswordUserAuthComponent;
  let fixture: ComponentFixture<ForgotPasswordUserAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordUserAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordUserAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
