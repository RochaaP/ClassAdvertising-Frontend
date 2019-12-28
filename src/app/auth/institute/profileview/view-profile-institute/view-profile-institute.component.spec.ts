import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProfileInstituteComponent } from './view-profile-institute.component';

describe('ViewProfileInstituteComponent', () => {
  let component: ViewProfileInstituteComponent;
  let fixture: ComponentFixture<ViewProfileInstituteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProfileInstituteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProfileInstituteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
