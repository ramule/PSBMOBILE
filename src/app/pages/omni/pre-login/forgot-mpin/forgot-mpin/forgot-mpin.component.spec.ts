import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotMpinComponent } from './forgot-mpin.component';

describe('ForgotMpinComponent', () => {
  let component: ForgotMpinComponent;
  let fixture: ComponentFixture<ForgotMpinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotMpinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotMpinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
