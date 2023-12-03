import { TestBed } from '@angular/core/testing';

import { CvInfoResolver } from './cv-info.resolver';

describe('CvInfoResolver', () => {
  let resolver: CvInfoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CvInfoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
