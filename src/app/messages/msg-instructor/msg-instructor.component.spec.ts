import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgInstructorComponent } from './msg-instructor.component';

describe('MsgInstructorComponent', () => {
  let component: MsgInstructorComponent;
  let fixture: ComponentFixture<MsgInstructorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsgInstructorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsgInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
