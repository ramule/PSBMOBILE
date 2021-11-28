import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAccountsDashboardComponent } from './manage-accounts-dashboard.component';

describe('ManageAccountsDashboardComponent', () => {
  let component: ManageAccountsDashboardComponent;
  let fixture: ComponentFixture<ManageAccountsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAccountsDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAccountsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
