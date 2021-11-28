import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InwardChequeInquiryDetailsComponent } from './inward-cheque-inquiry-details.component';

describe('InwardChequeInquiryDetailsComponent', () => {
  let component: InwardChequeInquiryDetailsComponent;
  let fixture: ComponentFixture<InwardChequeInquiryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InwardChequeInquiryDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InwardChequeInquiryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
