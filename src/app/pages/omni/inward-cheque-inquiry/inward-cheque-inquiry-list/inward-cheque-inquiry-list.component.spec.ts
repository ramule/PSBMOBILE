import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InwardChequeInquiryListComponent } from './inward-cheque-inquiry-list.component';

describe('InwardChequeInquiryListComponent', () => {
  let component: InwardChequeInquiryListComponent;
  let fixture: ComponentFixture<InwardChequeInquiryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InwardChequeInquiryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InwardChequeInquiryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
