import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingRequestPayerViewDetailsComponent } from './pending-request-payer-view-details.component';

describe('PendingRequestPayerViewDetailsComponent', () => {
  let component: PendingRequestPayerViewDetailsComponent;
  let fixture: ComponentFixture<PendingRequestPayerViewDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingRequestPayerViewDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingRequestPayerViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
