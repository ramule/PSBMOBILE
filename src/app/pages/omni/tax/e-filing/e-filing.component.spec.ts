import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EFilingComponent } from './e-filing.component';

describe('EFilingComponent', () => {
  let component: EFilingComponent;
  let fixture: ComponentFixture<EFilingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EFilingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EFilingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
