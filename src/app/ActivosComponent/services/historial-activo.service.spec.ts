import { TestBed } from '@angular/core/testing';

import { HistorialActivoService } from './historial-activo.service';

describe('HistorialActivoService', () => {
  let service: HistorialActivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistorialActivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
