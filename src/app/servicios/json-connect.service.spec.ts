import { TestBed } from '@angular/core/testing';

import { JsonConnectService } from './json-connect.service';

describe('JsonConnectService', () => {
  let service: JsonConnectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonConnectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
