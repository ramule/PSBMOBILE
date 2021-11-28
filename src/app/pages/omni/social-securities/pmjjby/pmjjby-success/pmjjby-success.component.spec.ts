import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmjjbySuccessComponent } from './pmjjby-success.component';

describe('PmjjbySuccessComponent', () => {
  let component: PmjjbySuccessComponent;
  let fixture: ComponentFixture<PmjjbySuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmjjbySuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmjjbySuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
