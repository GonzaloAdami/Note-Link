import { TestBed } from '@angular/core/testing';

import { RenderPhotoSystemService } from './render-photo-system.service';

describe('RenderPhotoSystemService', () => {
  let service: RenderPhotoSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RenderPhotoSystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
