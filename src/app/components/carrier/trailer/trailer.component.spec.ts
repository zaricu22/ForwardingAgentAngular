import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TrailerComponent } from './trailer.component';

describe('TrailerComponent', () => {
  let component: TrailerComponent;
  let fixture: ComponentFixture<TrailerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TrailerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
