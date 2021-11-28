import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratePinComponent } from './generate-pin.component';

describe('GeneratePinComponent', () => {
  let component: GeneratePinComponent;
  let fixture: ComponentFixture<GeneratePinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratePinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratePinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
