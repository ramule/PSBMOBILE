import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositivePaySuccessComponent } from './positive-pay-success.component';

describe('PositivePaySuccessComponent', () => {
  let component: PositivePaySuccessComponent;
  let fixture: ComponentFixture<PositivePaySuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositivePaySuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PositivePaySuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
