import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUpiGlobalConfirmationComponent } from './update-upi-global-confirmation.component';

describe('UpdateUpiGlobalConfirmationComponent', () => {
  let component: UpdateUpiGlobalConfirmationComponent;
  let fixture: ComponentFixture<UpdateUpiGlobalConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateUpiGlobalConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUpiGlobalConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
