import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillRaiseComplaintComponent } from './bill-raise-complaint.component';

describe('BillRaiseComplaintComponent', () => {
  let component: BillRaiseComplaintComponent;
  let fixture: ComponentFixture<BillRaiseComplaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillRaiseComplaintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillRaiseComplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
