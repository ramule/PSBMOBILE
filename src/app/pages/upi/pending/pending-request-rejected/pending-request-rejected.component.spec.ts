import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingRequestRejectedComponent } from './pending-request-rejected.component';

describe('PendingRequestRejectedComponent', () => {
  let component: PendingRequestRejectedComponent;
  let fixture: ComponentFixture<PendingRequestRejectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingRequestRejectedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingRequestRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
