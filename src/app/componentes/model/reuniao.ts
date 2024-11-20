import { Evento } from "./Evento";

export interface Reuniao {
  descricao: string,
  data: string,
  inicio: string,
  termino: string,
  faixaEtaria: string,
  evento: Evento,
  numeroCrianca: number,
  incluiAberta: boolean,
  repetirSemanalmente: boolean,
  quantidadeReunioes: number,
  reuniaoFechada:boolean
}
