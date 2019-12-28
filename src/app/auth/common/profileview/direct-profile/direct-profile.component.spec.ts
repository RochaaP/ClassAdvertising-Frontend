import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectProfileComponent } from './direct-profile.component';

describe('DirectProfileComponent', () => {
  let component: DirectProfileComponent;
  let fixture: ComponentFixture<DirectProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
