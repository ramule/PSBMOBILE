import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotlistCardComponent } from './hotlist-card.component';

describe('HotlistCardComponent', () => {
  let component: HotlistCardComponent;
  let fixture: ComponentFixture<HotlistCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotlistCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotlistCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
