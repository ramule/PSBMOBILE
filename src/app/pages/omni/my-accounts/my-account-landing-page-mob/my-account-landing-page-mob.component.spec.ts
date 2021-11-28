import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountLandingPageMobComponent } from './my-account-landing-page-mob.component';

describe('MyAccountLandingPageMobComponent', () => {
  let component: MyAccountLandingPageMobComponent;
  let fixture: ComponentFixture<MyAccountLandingPageMobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAccountLandingPageMobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAccountLandingPageMobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
