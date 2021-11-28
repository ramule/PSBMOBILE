import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobMycardsManageComponent } from './mob-mycards-manage.component';

describe('MobMycardsManageComponent', () => {
  let component: MobMycardsManageComponent;
  let fixture: ComponentFixture<MobMycardsManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobMycardsManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobMycardsManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
