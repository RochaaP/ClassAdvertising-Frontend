import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesViewInstituteComponent } from './classes-view-institute.component';

describe('ClassesViewInstituteComponent', () => {
  let component: ClassesViewInstituteComponent;
  let fixture: ComponentFixture<ClassesViewInstituteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassesViewInstituteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassesViewInstituteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
