import { TestBed, inject } from '@angular/core/testing';

import { LastService } from './last.service';

describe('LastService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LastService]
    });
  });

  it('should be created', inject([LastService], (service: LastService) => {
    expect(service).toBeTruthy();
  }));
});
