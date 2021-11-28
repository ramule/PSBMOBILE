import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetTpinComponent } from './reset-tpin.component';

describe('ResetTpinComponent', () => {
  let component: ResetTpinComponent;
  let fixture: ComponentFixture<ResetTpinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetTpinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetTpinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
