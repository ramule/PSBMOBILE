import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationCreateUpiComponent } from './registration-create-upi.component';

describe('RegistrationCreateUpiComponent', () => {
  let component: RegistrationCreateUpiComponent;
  let fixture: ComponentFixture<RegistrationCreateUpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationCreateUpiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationCreateUpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
