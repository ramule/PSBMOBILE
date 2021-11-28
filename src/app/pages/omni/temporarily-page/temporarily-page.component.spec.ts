import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporarilyPageComponent } from './temporarily-page.component';

describe('TemporarilyPageComponent', () => {
  let component: TemporarilyPageComponent;
  let fixture: ComponentFixture<TemporarilyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemporarilyPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemporarilyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
