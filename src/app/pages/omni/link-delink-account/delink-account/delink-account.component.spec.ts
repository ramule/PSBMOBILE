import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelinkAccountComponent } from './delink-account.component';

describe('DelinkAccountComponent', () => {
  let component: DelinkAccountComponent;
  let fixture: ComponentFixture<DelinkAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelinkAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DelinkAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
