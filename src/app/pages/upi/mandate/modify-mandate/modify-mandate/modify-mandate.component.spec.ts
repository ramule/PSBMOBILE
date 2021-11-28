import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyMandateComponent } from './modify-mandate.component';

describe('ModifyMandateComponent', () => {
  let component: ModifyMandateComponent;
  let fixture: ComponentFixture<ModifyMandateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyMandateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyMandateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
