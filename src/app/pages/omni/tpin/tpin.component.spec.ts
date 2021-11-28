import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OTPSessionComponent } from './otp-session.component';

describe('OTPSessionComponent', () => {
  let component: OTPSessionComponent;
  let fixture: ComponentFixture<OTPSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OTPSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OTPSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
