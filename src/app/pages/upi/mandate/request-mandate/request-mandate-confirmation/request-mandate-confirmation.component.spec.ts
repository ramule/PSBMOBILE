import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestMandateConfirmationComponent } from './request-mandate-confirmation.component';

describe('RequestMandateConfirmationComponent', () => {
  let component: RequestMandateConfirmationComponent;
  let fixture: ComponentFixture<RequestMandateConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestMandateConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestMandateConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
