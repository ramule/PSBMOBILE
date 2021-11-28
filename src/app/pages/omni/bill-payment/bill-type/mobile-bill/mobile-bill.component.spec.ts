import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileBillComponent } from './mobile-bill.component';

describe('MobileBillComponent', () => {
  let component: MobileBillComponent;
  let fixture: ComponentFixture<MobileBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
