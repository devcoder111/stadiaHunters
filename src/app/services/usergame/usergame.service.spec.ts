import { TestBed } from '@angular/core/testing';

import { UsergameService } from './usergame.service';

describe('UsergameService', () => {
  let service: UsergameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsergameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
