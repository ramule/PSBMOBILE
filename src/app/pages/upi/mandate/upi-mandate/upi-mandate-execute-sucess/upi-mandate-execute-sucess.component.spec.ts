import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecuteMandateSuccessComponent } from './upi-mandate-execute-sucess.component';

describe('ExecuteMandateSuccessComponent', () => {
  let component: ExecuteMandateSuccessComponent;
  let fixture: ComponentFixture<ExecuteMandateSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExecuteMandateSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecuteMandateSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
