import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectUpiIdListComponent } from './collect-upi-id-list.component';

describe('CollectUpiIdListComponent', () => {
  let component: CollectUpiIdListComponent;
  let fixture: ComponentFixture<CollectUpiIdListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectUpiIdListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectUpiIdListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
