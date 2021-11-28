import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobServiceLandingComponent } from './mob-service-landing.component';

describe('MobServiceLandingComponent', () => {
  let component: MobServiceLandingComponent;
  let fixture: ComponentFixture<MobServiceLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobServiceLandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobServiceLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
