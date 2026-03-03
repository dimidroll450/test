import { TestBed } from '@angular/core/testing';

import { SearchBook } from './search-book';

describe('SearchBook', () => {
  let service: SearchBook;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchBook);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
