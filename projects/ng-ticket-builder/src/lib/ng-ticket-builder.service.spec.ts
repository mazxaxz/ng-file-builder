import { TestBed, inject } from '@angular/core/testing';

import { NgTicketBuilderService } from './ng-ticket-builder.service';

describe('NgTicketBuilderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgTicketBuilderService]
    });
  });

  it('should be created', inject([NgTicketBuilderService], (service: NgTicketBuilderService) => {
    expect(service).toBeTruthy();
  }));
});
