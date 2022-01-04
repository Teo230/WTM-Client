import { TestBed } from '@angular/core/testing';

import { WtmApiService } from './wtm-api.service';

describe('WtmApiService', () => {
  let service: WtmApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WtmApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
