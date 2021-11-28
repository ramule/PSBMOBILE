import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationMpinValidateUserComponent } from './registration-mpin-validate-user.component';

describe('RegistrationMpinValidateUserComponent', () => {
  let component: RegistrationMpinValidateUserComponent;
  let fixture: ComponentFixture<RegistrationMpinValidateUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationMpinValidateUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationMpinValidateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
