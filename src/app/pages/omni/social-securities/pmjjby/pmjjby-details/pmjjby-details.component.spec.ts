import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmjjbyDetailsComponent } from './pmjjby-details.component';

describe('PmjjbyDetailsComponent', () => {
  let component: PmjjbyDetailsComponent;
  let fixture: ComponentFixture<PmjjbyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmjjbyDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmjjbyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
