import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NomineeOverviewComponent } from './nominee-overview.component';

describe('NomineeOverviewComponent', () => {
  let component: NomineeOverviewComponent;
  let fixture: ComponentFixture<NomineeOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NomineeOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NomineeOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
