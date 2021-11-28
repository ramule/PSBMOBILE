import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApyOverviewComponent } from './apy-overview.component';

describe('ApyOverviewComponent', () => {
  let component: ApyOverviewComponent;
  let fixture: ComponentFixture<ApyOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApyOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApyOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
