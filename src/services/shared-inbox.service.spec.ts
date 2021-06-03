import { TestBed } from '@angular/core/testing';

import { SharedInboxService } from './shared-inbox.service';

describe('SharedInboxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedInboxService = TestBed.get(SharedInboxService);
    expect(service).toBeTruthy();
  });
});
