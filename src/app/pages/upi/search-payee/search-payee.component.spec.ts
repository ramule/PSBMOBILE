import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPayeeComponent } from './search-payee.component';

describe('SearchPayeeComponent', () => {
  let component: SearchPayeeComponent;
  let fixture: ComponentFixture<SearchPayeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPayeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPayeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
