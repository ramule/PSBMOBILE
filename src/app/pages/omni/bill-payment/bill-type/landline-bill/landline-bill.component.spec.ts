import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandlineBillComponent } from './landline-bill.component';

describe('LandlineBillComponent', () => {
  let component: LandlineBillComponent;
  let fixture: ComponentFixture<LandlineBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandlineBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandlineBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
