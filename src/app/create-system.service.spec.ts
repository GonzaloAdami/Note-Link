import { TestBed } from '@angular/core/testing';

import { CreateSystemService } from './create-system.service';

describe('CreateSystemService', () => {
  let service: CreateSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateSystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
