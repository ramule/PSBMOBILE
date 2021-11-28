import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqOmniComponent } from './faq-omni.component';

describe('FaqOmniComponent', () => {
  let component: FaqOmniComponent;
  let fixture: ComponentFixture<FaqOmniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqOmniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqOmniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
