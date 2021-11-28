import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyStandingInstructionComponent } from './modify-standing-instruction.component';

describe('ModifyStandingInstructionComponent', () => {
  let component: ModifyStandingInstructionComponent;
  let fixture: ComponentFixture<ModifyStandingInstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyStandingInstructionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyStandingInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
