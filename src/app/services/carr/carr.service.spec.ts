import { TestBed } from '@angular/core/testing';

import { CarrService } from './carr.service';

describe('CarrService', () => {
  let service: CarrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
