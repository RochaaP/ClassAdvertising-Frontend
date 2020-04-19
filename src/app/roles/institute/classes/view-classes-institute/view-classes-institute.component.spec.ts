import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClassesInstituteComponent } from './view-classes-institute.component';

describe('ViewClassesInstituteComponent', () => {
  let component: ViewClassesInstituteComponent;
  let fixture: ComponentFixture<ViewClassesInstituteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewClassesInstituteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewClassesInstituteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
