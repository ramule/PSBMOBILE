import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandingInstructionViewComponent } from './standing-instruction-view.component';

describe('StandingInstructionViewComponent', () => {
  let component: StandingInstructionViewComponent;
  let fixture: ComponentFixture<StandingInstructionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandingInstructionViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StandingInstructionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
