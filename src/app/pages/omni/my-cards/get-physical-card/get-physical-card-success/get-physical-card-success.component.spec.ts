import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPhysicalCardSuccessComponent } from './get-physical-card-success.component';

describe('GetPhysicalCardSuccessComponent', () => {
  let component: GetPhysicalCardSuccessComponent;
  let fixture: ComponentFixture<GetPhysicalCardSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetPhysicalCardSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetPhysicalCardSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
