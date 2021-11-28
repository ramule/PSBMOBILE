import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingUpiIdBlockSuccessComponent } from './pending-upi-id-block-success.component';

describe('PendingUpiIdBlockSuccessComponent', () => {
  let component: PendingUpiIdBlockSuccessComponent;
  let fixture: ComponentFixture<PendingUpiIdBlockSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingUpiIdBlockSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingUpiIdBlockSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
