import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClassesInstructorComponent } from './view-classes-instructor.component';

describe('ViewClassesInstructorComponent', () => {
  let component: ViewClassesInstructorComponent;
  let fixture: ComponentFixture<ViewClassesInstructorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewClassesInstructorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewClassesInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
