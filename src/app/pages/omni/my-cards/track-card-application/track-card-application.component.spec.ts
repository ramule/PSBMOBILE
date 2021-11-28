import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackCardApplicationComponent } from './track-card-application.component';

describe('TrackCardApplicationComponent', () => {
  let component: TrackCardApplicationComponent;
  let fixture: ComponentFixture<TrackCardApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackCardApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackCardApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
