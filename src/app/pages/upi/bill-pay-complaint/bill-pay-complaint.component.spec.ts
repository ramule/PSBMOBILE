import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillPayComplaintComponent } from './bill-pay-complaint.component';

describe('BillPayComplaintComponent', () => {
  let component: BillPayComplaintComponent;
  let fixture: ComponentFixture<BillPayComplaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillPayComplaintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillPayComplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
