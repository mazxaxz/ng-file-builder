import { TestBed, inject } from '@angular/core/testing';

import { NgFileBuilderService } from './ng-file-builder.service';

describe('NgFileBuilderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgFileBuilderService]
    });
  });

  it('should be created', inject([NgFileBuilderService], (service: NgFileBuilderService) => {
    expect(service).toBeTruthy();
  }));
});
