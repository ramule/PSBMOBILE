import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreServicesComponent } from './more-services.component';

describe('MoreServicesComponent', () => {
  let component: MoreServicesComponent;
  let fixture: ComponentFixture<MoreServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
