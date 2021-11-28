import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectSearchContactListComponent } from './collect-search-contact-list.component';

describe('CollectSearchContactListComponent', () => {
  let component: CollectSearchContactListComponent;
  let fixture: ComponentFixture<CollectSearchContactListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectSearchContactListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectSearchContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
