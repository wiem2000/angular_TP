import { TestBed } from '@angular/core/testing';

import { CvResolver } from './cv.resolver';

describe('CvResolver', () => {
  let resolver: CvResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CvResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
