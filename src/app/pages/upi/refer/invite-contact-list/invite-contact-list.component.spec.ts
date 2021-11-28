import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteContactListComponent } from './invite-contact-list.component';

describe('InviteContactListComponent', () => {
  let component: InviteContactListComponent;
  let fixture: ComponentFixture<InviteContactListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteContactListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
