import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetNewTpinComponent } from './reset-new-tpin.component';

describe('ResetNewTpinComponent', () => {
  let component: ResetNewTpinComponent;
  let fixture: ComponentFixture<ResetNewTpinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetNewTpinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetNewTpinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
