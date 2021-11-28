import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratePinSuccessComponent } from './generate-pin-success.component';

describe('GeneratePinSuccessComponent', () => {
  let component: GeneratePinSuccessComponent;
  let fixture: ComponentFixture<GeneratePinSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratePinSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratePinSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
