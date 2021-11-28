import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmjjbyOverviewComponent } from './pmjjby-overview.component';

describe('PmjjbyOverviewComponent', () => {
  let component: PmjjbyOverviewComponent;
  let fixture: ComponentFixture<PmjjbyOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmjjbyOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmjjbyOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
