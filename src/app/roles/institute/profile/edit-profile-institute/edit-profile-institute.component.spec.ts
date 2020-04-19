import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileInstituteComponent } from './edit-profile-institute.component';

describe('EditProfileInstituteComponent', () => {
  let component: EditProfileInstituteComponent;
  let fixture: ComponentFixture<EditProfileInstituteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProfileInstituteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileInstituteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
