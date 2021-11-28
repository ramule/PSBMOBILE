import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApySuccessComponent } from './apy-success.component';

describe('ApySuccessComponent', () => {
  let component: ApySuccessComponent;
  let fixture: ComponentFixture<ApySuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApySuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApySuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
