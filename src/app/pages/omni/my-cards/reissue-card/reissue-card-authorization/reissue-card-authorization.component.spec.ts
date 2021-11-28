import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReissueCardAuthorizationComponent } from './reissue-card-authorization.component';

describe('ReissueCardAuthorizationComponent', () => {
  let component: ReissueCardAuthorizationComponent;
  let fixture: ComponentFixture<ReissueCardAuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReissueCardAuthorizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReissueCardAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
