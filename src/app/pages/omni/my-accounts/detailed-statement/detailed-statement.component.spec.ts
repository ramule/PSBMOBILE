import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedStatementComponent } from './detailed-statement.component';

describe('DetailedStatementComponent', () => {
  let component: DetailedStatementComponent;
  let fixture: ComponentFixture<DetailedStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedStatementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
