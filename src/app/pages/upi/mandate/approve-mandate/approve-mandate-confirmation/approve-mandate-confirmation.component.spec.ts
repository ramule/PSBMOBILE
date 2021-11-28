import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveMandateConfirmationComponent } from './approve-mandate-confirmation.component';

describe('ApproveMandateConfirmationComponent', () => {
  let component: ApproveMandateConfirmationComponent;
  let fixture: ComponentFixture<ApproveMandateConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveMandateConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveMandateConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
