import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BhimUpiPayComponent } from './bhim-upi-pay.component';

describe('BhimUpiPayComponent', () => {
  let component: BhimUpiPayComponent;
  let fixture: ComponentFixture<BhimUpiPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BhimUpiPayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BhimUpiPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
