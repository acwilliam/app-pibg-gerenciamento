import { TestBed } from '@angular/core/testing';

import { CacularIdadeService } from './cacular-idade.service';

describe('CacularIdadeService', () => {
  let service: CacularIdadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CacularIdadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
