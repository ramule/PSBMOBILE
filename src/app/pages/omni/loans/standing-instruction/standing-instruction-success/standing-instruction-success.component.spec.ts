import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandingInstructionSuccessComponent } from './standing-instruction-success.component';

describe('StandingInstructionSuccessComponent', () => {
  let component: StandingInstructionSuccessComponent;
  let fixture: ComponentFixture<StandingInstructionSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandingInstructionSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StandingInstructionSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
