import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreezeAccountComponent } from './freeze-account.component';

describe('FreezeAccountComponent', () => {
  let component: FreezeAccountComponent;
  let fixture: ComponentFixture<FreezeAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreezeAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreezeAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
