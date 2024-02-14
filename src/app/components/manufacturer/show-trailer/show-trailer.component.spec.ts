import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShowTrailerComponent } from './show-trailer.component';

describe('ShowTrailerComponent', () => {
  let component: ShowTrailerComponent;
  let fixture: ComponentFixture<ShowTrailerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowTrailerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTrailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
