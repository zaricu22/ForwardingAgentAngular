import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShowTruckComponent } from './show-truck.component';

describe('ShowTruckComponent', () => {
  let component: ShowTruckComponent;
  let fixture: ComponentFixture<ShowTruckComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowTruckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
