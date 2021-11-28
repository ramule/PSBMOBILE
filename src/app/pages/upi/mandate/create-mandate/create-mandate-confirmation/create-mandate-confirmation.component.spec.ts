import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMandateConfirmationComponent } from './create-mandate-confirmation.component';

describe('CreateMandateConfirmationComponent', () => {
  let component: CreateMandateConfirmationComponent;
  let fixture: ComponentFixture<CreateMandateConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMandateConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMandateConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
