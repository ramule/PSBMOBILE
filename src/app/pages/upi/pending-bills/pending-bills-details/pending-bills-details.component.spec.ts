import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingBillsDetailsComponent } from './pending-bills-details.component';

describe('PendingBillsDetailsComponent', () => {
  let component: PendingBillsDetailsComponent;
  let fixture: ComponentFixture<PendingBillsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingBillsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingBillsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
