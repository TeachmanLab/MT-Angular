import { TestBed, inject } from '@angular/core/testing';

import { SessionButtonService } from './session-button.service';

describe('SessionButtonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionButtonService]
    });
  });

  it('should be created', inject([SessionButtonService], (service: SessionButtonService) => {
    expect(service).toBeTruthy();
  }));
});
