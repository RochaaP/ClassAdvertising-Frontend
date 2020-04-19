import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesChangeComponent } from './images-change.component';

describe('ImagesChangeComponent', () => {
  let component: ImagesChangeComponent;
  let fixture: ComponentFixture<ImagesChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagesChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
