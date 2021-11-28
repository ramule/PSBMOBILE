import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayEmiComponent } from './pay-emi.component';

describe('PayEmiComponent', () => {
  let component: PayEmiComponent;
  let fixture: ComponentFixture<PayEmiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayEmiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayEmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
