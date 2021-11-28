import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobQuickAccessLandingComponent } from './mob-quick-access-landing.component';

describe('MobQuickAccessLandingComponent', () => {
  let component: MobQuickAccessLandingComponent;
  let fixture: ComponentFixture<MobQuickAccessLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobQuickAccessLandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobQuickAccessLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
