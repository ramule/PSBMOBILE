import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFifteenGhAuthComponent } from './form-fifteen-gh-auth.component';

describe('FormFifteenGhAuthComponent', () => {
  let component: FormFifteenGhAuthComponent;
  let fixture: ComponentFixture<FormFifteenGhAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFifteenGhAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFifteenGhAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
