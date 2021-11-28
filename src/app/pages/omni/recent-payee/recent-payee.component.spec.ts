import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentPayeeComponent } from './recent-payee.component';

describe('RecentPayeeComponent', () => {
  let component: RecentPayeeComponent;
  let fixture: ComponentFixture<RecentPayeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentPayeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentPayeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
