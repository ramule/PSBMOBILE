import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMobileComponent } from './login-mobile.component';

describe('LoginComponent', () => {
  let component: LoginMobileComponent;
  let fixture: ComponentFixture<LoginMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
