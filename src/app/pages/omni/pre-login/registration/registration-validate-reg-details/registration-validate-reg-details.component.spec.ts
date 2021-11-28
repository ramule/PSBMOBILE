import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationValidateRegComponent } from './registration-validate-reg-details.component';

describe('RegistrationValidateRegComponent', () => {
  let component: RegistrationValidateRegComponent;
  let fixture: ComponentFixture<RegistrationValidateRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationValidateRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationValidateRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
