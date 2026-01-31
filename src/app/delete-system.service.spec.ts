import { TestBed } from '@angular/core/testing';

import { DeleteSystemService } from './delete-system.service';

describe('DeleteSystemService', () => {
  let service: DeleteSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteSystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
