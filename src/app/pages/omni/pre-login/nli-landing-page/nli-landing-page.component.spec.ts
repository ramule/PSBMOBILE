import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NliLandingPageComponent } from './nli-landing-page.component';

describe('NliLandingPageComponent', () => {
  let component: NliLandingPageComponent;
  let fixture: ComponentFixture<NliLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NliLandingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NliLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
