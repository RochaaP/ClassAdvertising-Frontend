import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDetailsInstituteComponent } from './profile-details-institute.component';

describe('ProfileDetailsInstituteComponent', () => {
  let component: ProfileDetailsInstituteComponent;
  let fixture: ComponentFixture<ProfileDetailsInstituteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileDetailsInstituteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDetailsInstituteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
