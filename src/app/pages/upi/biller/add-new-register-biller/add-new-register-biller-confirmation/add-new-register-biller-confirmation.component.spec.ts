import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewRegisterBillerConfirmationComponent } from './add-new-register-biller-confirmation.component';

describe('AddNewRegisterBillerConfirmationComponent', () => {
  let component: AddNewRegisterBillerConfirmationComponent;
  let fixture: ComponentFixture<AddNewRegisterBillerConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewRegisterBillerConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewRegisterBillerConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
