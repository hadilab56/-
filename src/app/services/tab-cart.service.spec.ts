import { TestBed } from '@angular/core/testing';

import { TabCartService } from './tab-cart.service';

describe('TabCartService', () => {
  let service: TabCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
