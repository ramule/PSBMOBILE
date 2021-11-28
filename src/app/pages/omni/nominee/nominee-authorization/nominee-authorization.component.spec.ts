import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NomineeAuthorizationComponent } from './nominee-authorization.component';

describe('NomineeAuthorizationComponent', () => {
  let component: NomineeAuthorizationComponent;
  let fixture: ComponentFixture<NomineeAuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NomineeAuthorizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NomineeAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
