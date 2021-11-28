import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationSecurityQuestionComponent } from './registration-security-question.component';

describe('RegistrationSecurityQuestionComponent', () => {
  let component: RegistrationSecurityQuestionComponent;
  let fixture: ComponentFixture<RegistrationSecurityQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationSecurityQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationSecurityQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
