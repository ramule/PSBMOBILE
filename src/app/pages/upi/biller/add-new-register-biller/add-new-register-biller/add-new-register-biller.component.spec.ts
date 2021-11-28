import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewRegisterBillerComponent } from './add-new-register-biller.component';

describe('AddNewRegisterBillerComponent', () => {
  let component: AddNewRegisterBillerComponent;
  let fixture: ComponentFixture<AddNewRegisterBillerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewRegisterBillerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewRegisterBillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
