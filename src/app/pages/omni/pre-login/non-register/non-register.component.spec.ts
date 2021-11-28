import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonRegisterComponent } from './non-register.component';

describe('NonRegisterComponent', () => {
  let component: NonRegisterComponent;
  let fixture: ComponentFixture<NonRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
