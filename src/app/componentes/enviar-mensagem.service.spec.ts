import { TestBed } from '@angular/core/testing';

import { EnviarMensagemService } from './enviar-mensagem.service';

describe('EnviarMensagemService', () => {
  let service: EnviarMensagemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnviarMensagemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
