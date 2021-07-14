import { TestBed } from '@angular/core/testing';

import { FormularioClienteService } from './formulario-cliente.service';

describe('FormularioClienteService', () => {
  let service: FormularioClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormularioClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
