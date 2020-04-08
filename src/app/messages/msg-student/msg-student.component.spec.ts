import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgStudentComponent } from './msg-student.component';

describe('MsgStudentComponent', () => {
  let component: MsgStudentComponent;
  let fixture: ComponentFixture<MsgStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsgStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsgStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
