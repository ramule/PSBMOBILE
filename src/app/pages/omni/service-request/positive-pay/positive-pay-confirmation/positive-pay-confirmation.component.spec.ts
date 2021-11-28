import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositivePayConfirmationComponent } from './positive-pay-confirmation.component';

describe('PositivePayConfirmationComponent', () => {
  let component: PositivePayConfirmationComponent;
  let fixture: ComponentFixture<PositivePayConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositivePayConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PositivePayConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
