import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmsbyComponent } from './pmsby.component';

describe('PmsbyComponent', () => {
  let component: PmsbyComponent;
  let fixture: ComponentFixture<PmsbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmsbyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmsbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
