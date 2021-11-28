import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpiSuccessComponent } from './create-upi-success.component';

describe('CreateUpiSuccessComponent', () => {
  let component: CreateUpiSuccessComponent;
  let fixture: ComponentFixture<CreateUpiSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpiSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpiSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
