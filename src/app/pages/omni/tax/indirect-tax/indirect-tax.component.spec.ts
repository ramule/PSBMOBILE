import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndirectTaxComponent } from './indirect-tax.component';

describe('IndirectTaxComponent', () => {
  let component: IndirectTaxComponent;
  let fixture: ComponentFixture<IndirectTaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndirectTaxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndirectTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
