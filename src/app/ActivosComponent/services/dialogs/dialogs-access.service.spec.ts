import { TestBed } from '@angular/core/testing';

import { DialogsAccessService } from './dialogs-access.service';

describe('DialogsAccessService', () => {
  let service: DialogsAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogsAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
