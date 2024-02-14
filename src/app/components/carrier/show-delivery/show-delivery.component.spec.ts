import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShowDeliveryComponent } from './show-delivery.component';

describe('ShowDeliveryComponent', () => {
  let component: ShowDeliveryComponent;
  let fixture: ComponentFixture<ShowDeliveryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
