import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotlistCardSuccessComponent } from './hotlist-card-success.component';

describe('HotlistCardSuccessComponent', () => {
  let component: HotlistCardSuccessComponent;
  let fixture: ComponentFixture<HotlistCardSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotlistCardSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotlistCardSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
