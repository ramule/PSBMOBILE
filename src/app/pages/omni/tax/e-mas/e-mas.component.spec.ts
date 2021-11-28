import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EMasComponent } from './e-mas.component';

describe('EMasComponent', () => {
  let component: EMasComponent;
  let fixture: ComponentFixture<EMasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EMasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EMasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
