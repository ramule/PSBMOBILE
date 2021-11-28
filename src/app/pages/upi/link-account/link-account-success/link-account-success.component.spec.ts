import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkAccountSuccessComponent } from './link-account-success.component';

describe('LinkAccountSuccessComponent', () => {
  let component: LinkAccountSuccessComponent;
  let fixture: ComponentFixture<LinkAccountSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkAccountSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkAccountSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
