import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReissueCardSuccessComponent } from './reissue-card-success.component';

describe('ReissueCardSuccessComponent', () => {
  let component: ReissueCardSuccessComponent;
  let fixture: ComponentFixture<ReissueCardSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReissueCardSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReissueCardSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
