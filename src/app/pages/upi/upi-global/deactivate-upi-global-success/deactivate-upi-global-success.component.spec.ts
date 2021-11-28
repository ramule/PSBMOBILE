import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivateUpiGlobalSuccessComponent } from './deactivate-upi-global-success.component';

describe('DeactivateUpiGlobalSuccessComponent', () => {
  let component: DeactivateUpiGlobalSuccessComponent;
  let fixture: ComponentFixture<DeactivateUpiGlobalSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeactivateUpiGlobalSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeactivateUpiGlobalSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
