import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReissueCardComponent } from './reissue-card.component';

describe('ReissueCardComponent', () => {
  let component: ReissueCardComponent;
  let fixture: ComponentFixture<ReissueCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReissueCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReissueCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
