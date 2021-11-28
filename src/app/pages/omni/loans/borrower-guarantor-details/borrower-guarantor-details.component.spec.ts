import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowerGuarantorDetailsComponent } from './borrower-guarantor-details.component';

describe('BorrowerGuarantorDetailsComponent', () => {
  let component: BorrowerGuarantorDetailsComponent;
  let fixture: ComponentFixture<BorrowerGuarantorDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowerGuarantorDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowerGuarantorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
