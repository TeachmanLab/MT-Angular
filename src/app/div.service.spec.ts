import { TestBed, inject } from '@angular/core/testing';

import { DivService } from './div.service';

describe('DivService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DivService]
    });
  });

  it('should be created', inject([DivService], (service: DivService) => {
    expect(service).toBeTruthy();
  }));
});
