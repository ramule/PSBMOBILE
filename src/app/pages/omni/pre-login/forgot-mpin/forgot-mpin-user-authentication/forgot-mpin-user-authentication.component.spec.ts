import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotMpinUserAuthenticationComponent } from './forgot-mpin-user-authentication.component';

describe('ForgotMpinUserAuthenticationComponent', () => {
  let component: ForgotMpinUserAuthenticationComponent;
  let fixture: ComponentFixture<ForgotMpinUserAuthenticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotMpinUserAuthenticationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotMpinUserAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
