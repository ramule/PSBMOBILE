import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPayeeConfirmComponent } from './add-payee-confirm.component';

describe('AddPayeeConfirmComponent', () => {
  let component: AddPayeeConfirmComponent;
  let fixture: ComponentFixture<AddPayeeConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPayeeConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPayeeConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
