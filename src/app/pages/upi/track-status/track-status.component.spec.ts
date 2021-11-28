import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackStatusComponent } from './track-status.component';

describe('TrackStatusComponent', () => {
  let component: TrackStatusComponent;
  let fixture: ComponentFixture<TrackStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
