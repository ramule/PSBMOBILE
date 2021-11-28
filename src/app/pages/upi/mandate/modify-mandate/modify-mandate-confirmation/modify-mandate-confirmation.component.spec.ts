import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyMandateConfirmationComponent } from './modify-mandate-confirmation.component';

describe('ModifyMandateConfirmationComponent', () => {
  let component: ModifyMandateConfirmationComponent;
  let fixture: ComponentFixture<ModifyMandateConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyMandateConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyMandateConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
