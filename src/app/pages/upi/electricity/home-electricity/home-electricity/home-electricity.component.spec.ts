import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeElectricityComponent } from './home-electricity.component';

describe('HomeElectricityComponent', () => {
  let component: HomeElectricityComponent;
  let fixture: ComponentFixture<HomeElectricityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeElectricityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeElectricityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
