import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDetailsInstructorComponent } from './profile-details-instructor.component';

describe('ProfileDetailsInstructorComponent', () => {
  let component: ProfileDetailsInstructorComponent;
  let fixture: ComponentFixture<ProfileDetailsInstructorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileDetailsInstructorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDetailsInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
