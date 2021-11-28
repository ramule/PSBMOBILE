import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobSocialLandingComponent } from './mob-social-landing.component';

describe('MobSocialLandingComponent', () => {
  let component: MobSocialLandingComponent;
  let fixture: ComponentFixture<MobSocialLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobSocialLandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobSocialLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
