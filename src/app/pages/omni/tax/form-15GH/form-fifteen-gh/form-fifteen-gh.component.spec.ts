import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFifteenGhComponent } from './form-fifteen-gh.component';

describe('FormFifteenGhComponent', () => {
  let component: FormFifteenGhComponent;
  let fixture: ComponentFixture<FormFifteenGhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFifteenGhComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFifteenGhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
