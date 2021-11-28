import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenDepositComponent } from './open-deposit.component';

describe('OpenDepositComponent', () => {
  let component: OpenDepositComponent;
  let fixture: ComponentFixture<OpenDepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenDepositComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
