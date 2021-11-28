import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterBillerConfirmationComponent } from './register-biller-confirmation.component';

describe('RegisterBillerConfirmationComponent', () => {
  let component: RegisterBillerConfirmationComponent;
  let fixture: ComponentFixture<RegisterBillerConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterBillerConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterBillerConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
