import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpiLoginComponent } from './upi-login.component';

describe('UpiLoginComponent', () => {
  let component: UpiLoginComponent;
  let fixture: ComponentFixture<UpiLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpiLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpiLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
