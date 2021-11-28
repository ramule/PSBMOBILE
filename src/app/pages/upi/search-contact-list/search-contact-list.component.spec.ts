import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchContactListComponent } from './search-contact-list.component';

describe('SearchContactListComponent', () => {
  let component: SearchContactListComponent;
  let fixture: ComponentFixture<SearchContactListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchContactListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
