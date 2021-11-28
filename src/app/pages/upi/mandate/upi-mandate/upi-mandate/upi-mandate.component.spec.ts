import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpiMandateComponent } from './upi-mandate.component';

describe('UpiMandateComponent', () => {
  let component: UpiMandateComponent;
  let fixture: ComponentFixture<UpiMandateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpiMandateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpiMandateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
