import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GstPayComponent } from './gst-pay.component';

describe('GstPayComponent', () => {
  let component: GstPayComponent;
  let fixture: ComponentFixture<GstPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GstPayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GstPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
