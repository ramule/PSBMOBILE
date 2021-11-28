import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeregisterComponent } from './deregister.component';

describe('DeregisterComponent', () => {
  let component: DeregisterComponent;
  let fixture: ComponentFixture<DeregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeregisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
