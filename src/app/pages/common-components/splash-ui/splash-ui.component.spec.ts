import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplashUiComponent } from './splash-ui.component';

describe('SplashUiComponent', () => {
  let component: SplashUiComponent;
  let fixture: ComponentFixture<SplashUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplashUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SplashUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
