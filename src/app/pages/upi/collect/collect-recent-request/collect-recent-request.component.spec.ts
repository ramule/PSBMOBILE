import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectRecentRequestComponent } from './collect-recent-request.component';

describe('CollectRecentRequestComponent', () => {
  let component: CollectRecentRequestComponent;
  let fixture: ComponentFixture<CollectRecentRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectRecentRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectRecentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
