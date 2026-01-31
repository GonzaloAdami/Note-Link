import { TestBed } from '@angular/core/testing';

import { HTTPServiceService } from './httpservice.service';

describe('HTTPServiceService', () => {
  let service: HTTPServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HTTPServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
