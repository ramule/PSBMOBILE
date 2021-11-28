import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsConditonsComponent } from './terms-conditons.component';

describe('TermsConditonsComponent', () => {
  let component: TermsConditonsComponent;
  let fixture: ComponentFixture<TermsConditonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermsConditonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsConditonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
