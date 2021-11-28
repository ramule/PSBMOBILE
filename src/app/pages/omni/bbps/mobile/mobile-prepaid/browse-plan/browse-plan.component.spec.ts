import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowsePlanComponent } from './browse-plan.component';

describe('BrowsePlanComponent', () => {
  let component: BrowsePlanComponent;
  let fixture: ComponentFixture<BrowsePlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowsePlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowsePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
