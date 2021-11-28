import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingRequestConfirmationComponent } from './pending-request-confirmation.component';

describe('PendingRequestConfirmationComponent', () => {
  let component: PendingRequestConfirmationComponent;
  let fixture: ComponentFixture<PendingRequestConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingRequestConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingRequestConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
