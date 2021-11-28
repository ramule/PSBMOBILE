import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositivePayComponent } from './positive-pay.component';

describe('PositivePayComponent', () => {
  let component: PositivePayComponent;
  let fixture: ComponentFixture<PositivePayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositivePayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PositivePayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
