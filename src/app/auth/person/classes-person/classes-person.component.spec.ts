import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesPersonComponent } from './classes-person.component';

describe('ClassesPersonComponent', () => {
  let component: ClassesPersonComponent;
  let fixture: ComponentFixture<ClassesPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassesPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassesPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
