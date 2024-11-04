import { TestBed } from '@angular/core/testing';

import { CalcularDepreciacionService } from './calcular-depreciacion.service';

describe('CalcularDepreciacionService', () => {
  let service: CalcularDepreciacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalcularDepreciacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
