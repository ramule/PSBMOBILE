import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFavoritePayeeComponent } from './search-favorite-payee.component';

describe('SearchFavoritePayeeComponent', () => {
  let component: SearchFavoritePayeeComponent;
  let fixture: ComponentFixture<SearchFavoritePayeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFavoritePayeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFavoritePayeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
