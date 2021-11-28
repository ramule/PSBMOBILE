import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmsbyOverviewComponent } from './pmsby-overview.component';

describe('PmsbyOverviewComponent', () => {
  let component: PmsbyOverviewComponent;
  let fixture: ComponentFixture<PmsbyOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmsbyOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmsbyOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
