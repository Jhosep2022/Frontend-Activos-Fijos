import { TestBed } from '@angular/core/testing';

import { IdentificadoresService } from './identificadores.service';

describe('IdentificadoresService', () => {
  let service: IdentificadoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdentificadoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
