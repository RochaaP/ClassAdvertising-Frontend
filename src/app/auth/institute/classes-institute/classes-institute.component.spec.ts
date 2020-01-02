import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesInstituteComponent } from './classes-institute.component';

describe('ClassesInstituteComponent', () => {
  let component: ClassesInstituteComponent;
  let fixture: ComponentFixture<ClassesInstituteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassesInstituteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassesInstituteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
