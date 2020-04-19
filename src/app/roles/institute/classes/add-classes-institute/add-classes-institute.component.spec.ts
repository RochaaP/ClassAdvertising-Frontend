import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClassesInstituteComponent } from './add-classes-institute.component';

describe('AddClassesInstituteComponent', () => {
  let component: AddClassesInstituteComponent;
  let fixture: ComponentFixture<AddClassesInstituteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddClassesInstituteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClassesInstituteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
