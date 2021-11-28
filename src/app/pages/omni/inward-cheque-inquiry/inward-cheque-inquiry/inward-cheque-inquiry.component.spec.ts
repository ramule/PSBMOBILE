import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InwardChequeInquiryComponent } from './inward-cheque-inquiry.component';

describe('InwardChequeInquiryComponent', () => {
  let component: InwardChequeInquiryComponent;
  let fixture: ComponentFixture<InwardChequeInquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InwardChequeInquiryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InwardChequeInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
