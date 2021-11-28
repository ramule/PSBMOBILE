import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRegisterBillerSuccessComponent } from './delete-register-biller-success.component';

describe('DeleteRegisterBillerSuccessComponent', () => {
  let component: DeleteRegisterBillerSuccessComponent;
  let fixture: ComponentFixture<DeleteRegisterBillerSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteRegisterBillerSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRegisterBillerSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
