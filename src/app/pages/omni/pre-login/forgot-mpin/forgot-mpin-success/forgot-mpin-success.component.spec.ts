import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotMpinSuccessComponent } from './forgot-mpin-success.component';

describe('ForgotMpinSuccessComponent', () => {
  let component: ForgotMpinSuccessComponent;
  let fixture: ComponentFixture<ForgotMpinSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotMpinSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotMpinSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
