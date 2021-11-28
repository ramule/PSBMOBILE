import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequeStatusInquiryComponent } from './cheque-status-inquiry.component';

describe('ChequeStatusInquiryComponent', () => {
  let component: ChequeStatusInquiryComponent;
  let fixture: ComponentFixture<ChequeStatusInquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChequeStatusInquiryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequeStatusInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
