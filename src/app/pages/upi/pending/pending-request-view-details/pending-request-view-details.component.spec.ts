import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingRequestViewDetailsComponent } from './pending-request-view-details.component';

describe('PendingRequestViewDetailsComponent', () => {
  let component: PendingRequestViewDetailsComponent;
  let fixture: ComponentFixture<PendingRequestViewDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingRequestViewDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingRequestViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
