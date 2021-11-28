import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPhysicalCardComponent } from './get-physical-card.component';

describe('GetPhysicalCardComponent', () => {
  let component: GetPhysicalCardComponent;
  let fixture: ComponentFixture<GetPhysicalCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetPhysicalCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetPhysicalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
