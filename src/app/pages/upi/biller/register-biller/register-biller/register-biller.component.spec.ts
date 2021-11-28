import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterBillerComponent } from './register-biller.component';

describe('RegisterBillerComponent', () => {
  let component: RegisterBillerComponent;
  let fixture: ComponentFixture<RegisterBillerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterBillerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterBillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
