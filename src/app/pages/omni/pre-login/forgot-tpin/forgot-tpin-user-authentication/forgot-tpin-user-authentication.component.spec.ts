import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotTpinUserAuthenticationComponent } from './forgot-tpin-user-authentication.component';

describe('ForgotTpinUserAuthenticationComponent', () => {
  let component: ForgotTpinUserAuthenticationComponent;
  let fixture: ComponentFixture<ForgotTpinUserAuthenticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotTpinUserAuthenticationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotTpinUserAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
