import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingBillMoreDetailsComponent } from './pending-bill-more-details.component';

describe('PendingBillMoreDetailsComponent', () => {
  let component: PendingBillMoreDetailsComponent;
  let fixture: ComponentFixture<PendingBillMoreDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingBillMoreDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingBillMoreDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
