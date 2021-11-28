import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFifteenGhSuccessComponent } from './form-fifteen-gh-success.component';

describe('FormFifteenGhSuccessComponent', () => {
  let component: FormFifteenGhSuccessComponent;
  let fixture: ComponentFixture<FormFifteenGhSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFifteenGhSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFifteenGhSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
