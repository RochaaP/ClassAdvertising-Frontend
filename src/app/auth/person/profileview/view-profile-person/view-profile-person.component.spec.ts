import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProfilePersonComponent } from './view-profile-person.component';

describe('ViewProfilePersonComponent', () => {
  let component: ViewProfilePersonComponent;
  let fixture: ComponentFixture<ViewProfilePersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProfilePersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProfilePersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
