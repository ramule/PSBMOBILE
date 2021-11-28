import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceBillComponent } from './insurance-bill.component';

describe('InsuranceBillComponent', () => {
  let component: InsuranceBillComponent;
  let fixture: ComponentFixture<InsuranceBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
