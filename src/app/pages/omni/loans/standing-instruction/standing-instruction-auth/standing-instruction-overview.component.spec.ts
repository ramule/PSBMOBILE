import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandingInstructionOverviewComponent } from './standing-instruction-overview.component';

describe('StandingInstructionOverviewComponent', () => {
  let component: StandingInstructionOverviewComponent;
  let fixture: ComponentFixture<StandingInstructionOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandingInstructionOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StandingInstructionOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
