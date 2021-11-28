import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUpiComponent } from './about-upi.component';

describe('AboutUpiComponent', () => {
  let component: AboutUpiComponent;
  let fixture: ComponentFixture<AboutUpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutUpiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutUpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
