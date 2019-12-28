import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPersonPostsComponent } from './view-person-posts.component';

describe('ViewPersonPostsComponent', () => {
  let component: ViewPersonPostsComponent;
  let fixture: ComponentFixture<ViewPersonPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPersonPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPersonPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
