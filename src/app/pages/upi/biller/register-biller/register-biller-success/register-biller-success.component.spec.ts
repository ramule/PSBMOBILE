import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterBillerSuccessComponent } from './register-biller-success.component';

describe('RegisterBillerSuccessComponent', () => {
  let component: RegisterBillerSuccessComponent;
  let fixture: ComponentFixture<RegisterBillerSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterBillerSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterBillerSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
