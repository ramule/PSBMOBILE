import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewRegisterBillerSuccessComponent } from './add-new-register-biller-success.component';

describe('AddNewRegisterBillerSuccessComponent', () => {
  let component: AddNewRegisterBillerSuccessComponent;
  let fixture: ComponentFixture<AddNewRegisterBillerSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewRegisterBillerSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewRegisterBillerSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
