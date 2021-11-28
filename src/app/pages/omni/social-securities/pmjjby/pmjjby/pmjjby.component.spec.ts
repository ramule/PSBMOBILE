import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmjjbyComponent } from './pmjjby.component';

describe('PmjjbyComponent', () => {
  let component: PmjjbyComponent;
  let fixture: ComponentFixture<PmjjbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmjjbyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmjjbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
