import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordUserDetailsComponent } from './forgot-password-user-details.component';

describe('ForgotPasswordUserDetailsComponent', () => {
  let component: ForgotPasswordUserDetailsComponent;
  let fixture: ComponentFixture<ForgotPasswordUserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordUserDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
