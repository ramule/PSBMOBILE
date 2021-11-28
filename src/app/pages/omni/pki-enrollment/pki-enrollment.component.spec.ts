import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PkiEnrollmentComponent } from './pki-enrollment.component';

describe('PkiEnrollmentComponent', () => {
  let component: PkiEnrollmentComponent;
  let fixture: ComponentFixture<PkiEnrollmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PkiEnrollmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PkiEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
