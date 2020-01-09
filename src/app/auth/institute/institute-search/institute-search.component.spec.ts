import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteSearchComponent } from './institute-search.component';

describe('InstituteSearchComponent', () => {
  let component: InstituteSearchComponent;
  let fixture: ComponentFixture<InstituteSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstituteSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituteSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
