import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillRaiseComplaintServiceSuccessComponent } from './bill-raise-complaint-service-success.component';

describe('BillRaiseComplaintServiceSuccessComponent', () => {
  let component: BillRaiseComplaintServiceSuccessComponent;
  let fixture: ComponentFixture<BillRaiseComplaintServiceSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillRaiseComplaintServiceSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillRaiseComplaintServiceSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
