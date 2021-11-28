import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MandateUpiIdListComponent } from './mandate-upi-id-list.component';

describe('MandateUpiIdListComponent', () => {
  let component: MandateUpiIdListComponent;
  let fixture: ComponentFixture<MandateUpiIdListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MandateUpiIdListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MandateUpiIdListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
