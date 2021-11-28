import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationUsernameComponent } from './registration-step3.component';

describe('RegistrationUsernameComponent', () => {
  let component: RegistrationUsernameComponent;
  let fixture: ComponentFixture<RegistrationUsernameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationUsernameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
