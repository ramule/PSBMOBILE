import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LienEnquiryComponent } from './lien-enquiry.component';

describe('LienEnquiryComponent', () => {
  let component: LienEnquiryComponent;
  let fixture: ComponentFixture<LienEnquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LienEnquiryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LienEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
