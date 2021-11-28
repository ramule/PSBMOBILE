import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenRdAccountOverviewComponent } from './open-rd-account-overview.component';

describe('OpenRdAccountOverviewComponent', () => {
  let component: OpenRdAccountOverviewComponent;
  let fixture: ComponentFixture<OpenRdAccountOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenRdAccountOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenRdAccountOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
