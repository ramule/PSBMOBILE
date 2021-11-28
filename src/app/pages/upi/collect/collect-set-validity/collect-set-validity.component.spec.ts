import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectSetValidityComponent } from './collect-set-validity.component';

describe('CollectSetValidityComponent', () => {
  let component: CollectSetValidityComponent;
  let fixture: ComponentFixture<CollectSetValidityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectSetValidityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectSetValidityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
