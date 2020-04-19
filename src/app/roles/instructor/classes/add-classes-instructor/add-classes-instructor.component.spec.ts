import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClassesInstructorComponent } from './add-classes-instructor.component';

describe('AddClassesInstructorComponent', () => {
  let component: AddClassesInstructorComponent;
  let fixture: ComponentFixture<AddClassesInstructorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddClassesInstructorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClassesInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
