import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritePayeeComponent } from './favorite-payee.component';

describe('FavoritePayeeComponent', () => {
  let component: FavoritePayeeComponent;
  let fixture: ComponentFixture<FavoritePayeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritePayeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritePayeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
