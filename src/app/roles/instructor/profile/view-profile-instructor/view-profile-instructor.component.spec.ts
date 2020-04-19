import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProfileInstructorComponent } from './view-profile-instructor.component';

describe('ViewProfileInstructorComponent', () => {
  let component: ViewProfileInstructorComponent;
  let fixture: ComponentFixture<ViewProfileInstructorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProfileInstructorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProfileInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
