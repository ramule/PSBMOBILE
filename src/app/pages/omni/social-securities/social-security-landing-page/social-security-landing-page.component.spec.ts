import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialSecurityLandingPageComponent } from './social-security-landing-page.component';

describe('SocialSecurityLandingPageComponent', () => {
  let component: SocialSecurityLandingPageComponent;
  let fixture: ComponentFixture<SocialSecurityLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialSecurityLandingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialSecurityLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
