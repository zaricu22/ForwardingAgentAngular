import { TestBed } from '@angular/core/testing';

import { TransportAppInterceptor } from './transport-app.interceptor';

describe('TransportAppInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TransportAppInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: TransportAppInterceptor = TestBed.inject(TransportAppInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
