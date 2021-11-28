import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationStepsComponent } from './registration-steps.component';

describe('RegistrationStepsComponent', () => {
  let component: RegistrationStepsComponent;
  let fixture: ComponentFixture<RegistrationStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationStepsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
