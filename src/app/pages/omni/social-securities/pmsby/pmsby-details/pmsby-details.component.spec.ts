import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmsbyDetailsComponent } from './pmsby-details.component';

describe('PmsbyDetailsComponent', () => {
  let component: PmsbyDetailsComponent;
  let fixture: ComponentFixture<PmsbyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmsbyDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmsbyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
