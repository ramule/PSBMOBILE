import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectEnterAmountComponent } from './collect-enter-amount.component';

describe('CollectEnterAmountComponent', () => {
  let component: CollectEnterAmountComponent;
  let fixture: ComponentFixture<CollectEnterAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectEnterAmountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectEnterAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
