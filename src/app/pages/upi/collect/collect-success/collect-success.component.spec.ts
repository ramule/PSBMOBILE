import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectSuccessComponent } from './collect-success.component';

describe('CollectSuccessComponent', () => {
  let component: CollectSuccessComponent;
  let fixture: ComponentFixture<CollectSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
