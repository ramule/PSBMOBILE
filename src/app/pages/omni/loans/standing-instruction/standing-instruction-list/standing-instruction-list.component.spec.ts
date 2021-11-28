import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandingInstructionListComponent } from './standing-instruction-list.component';

describe('StandingInstructionListComponent', () => {
  let component: StandingInstructionListComponent;
  let fixture: ComponentFixture<StandingInstructionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandingInstructionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StandingInstructionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
