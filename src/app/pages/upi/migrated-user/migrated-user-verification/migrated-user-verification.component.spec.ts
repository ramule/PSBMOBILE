import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MigratedUserVerificationComponent } from './migrated-user-verification.component';

describe('MigratedUserVerificationComponent', () => {
  let component: MigratedUserVerificationComponent;
  let fixture: ComponentFixture<MigratedUserVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MigratedUserVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MigratedUserVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
