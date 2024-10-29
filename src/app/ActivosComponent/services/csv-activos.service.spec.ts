import { TestBed } from '@angular/core/testing';

import { CsvActivosService } from './csv-activos.service';

describe('CsvActivosService', () => {
  let service: CsvActivosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CsvActivosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
