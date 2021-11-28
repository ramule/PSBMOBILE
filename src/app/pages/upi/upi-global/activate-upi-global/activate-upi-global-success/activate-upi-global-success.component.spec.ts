import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateUpiGlobalSuccessComponent } from './activate-upi-global-success.component';

describe('ActivateUpiGlobalSuccessComponent', () => {
  let component: ActivateUpiGlobalSuccessComponent;
  let fixture: ComponentFixture<ActivateUpiGlobalSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivateUpiGlobalSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateUpiGlobalSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
