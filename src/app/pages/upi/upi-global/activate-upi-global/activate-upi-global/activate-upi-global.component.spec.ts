import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateUpiGlobalComponent } from './activate-upi-global.component';

describe('ActivateUpiGlobalComponent', () => {
  let component: ActivateUpiGlobalComponent;
  let fixture: ComponentFixture<ActivateUpiGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivateUpiGlobalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateUpiGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
