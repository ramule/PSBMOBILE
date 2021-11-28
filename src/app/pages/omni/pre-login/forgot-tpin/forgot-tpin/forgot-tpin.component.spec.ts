import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotTpinComponent } from './forgot-tpin.component';

describe('ForgotTpinComponent', () => {
  let component: ForgotTpinComponent;
  let fixture: ComponentFixture<ForgotTpinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotTpinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotTpinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
