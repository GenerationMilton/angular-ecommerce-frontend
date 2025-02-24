import { TestBed } from '@angular/core/testing';

import { LivemiltonShopFormService } from './livemilton-shop-form.service';

describe('LivemiltonShopFormService', () => {
  let service: LivemiltonShopFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LivemiltonShopFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
