import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDeliveryComponent } from './show-delivery.component';

describe('ShowDeliveryComponent', () => {
  let component: ShowDeliveryComponent;
  let fixture: ComponentFixture<ShowDeliveryComponent>;

  beforeEach(async(() => {
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
