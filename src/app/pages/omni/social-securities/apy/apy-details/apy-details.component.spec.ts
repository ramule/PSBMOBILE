import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApyDetailsComponent } from './apy-details.component';

describe('ApyDetailsComponent', () => {
  let component: ApyDetailsComponent;
  let fixture: ComponentFixture<ApyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApyDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
