import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNewBillerComponent } from './register-new-biller.component';

describe('RegisterNewBillerComponent', () => {
  let component: RegisterNewBillerComponent;
  let fixture: ComponentFixture<RegisterNewBillerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterNewBillerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterNewBillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
