import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateUpiGlobalConfirmationComponent } from './activate-upi-global-confirmation.component';

describe('ActivateUpiGlobalConfirmationComponent', () => {
  let component: ActivateUpiGlobalConfirmationComponent;
  let fixture: ComponentFixture<ActivateUpiGlobalConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivateUpiGlobalConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateUpiGlobalConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
