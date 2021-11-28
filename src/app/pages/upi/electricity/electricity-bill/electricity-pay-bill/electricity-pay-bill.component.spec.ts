import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricityPayBillComponent } from './electricity-pay-bill.component';

describe('ElectricityPayBillComponent', () => {
  let component: ElectricityPayBillComponent;
  let fixture: ComponentFixture<ElectricityPayBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectricityPayBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectricityPayBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
