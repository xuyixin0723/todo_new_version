import { TestBed, inject } from '@angular/core/testing';

import { PcbviewService } from './pcbview.service';

describe('PcbviewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PcbviewService]
    });
  });

  it('should be created', inject([PcbviewService], (service: PcbviewService) => {
    expect(service).toBeTruthy();
  }));
});
