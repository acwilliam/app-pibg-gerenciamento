import { Frequencia } from './model/Frequencia';
export interface Cadastro {
  nomeResponsavel: string,
  nomeCrianca: string ,
  telefoneResponsavel: string,
  observacao: string,
  horario: string,
  identificador: Number,
  selecionado: boolean,
  dataNascimento: string,
  idade?:Number,
  sexo: string,
  tipo?: string,
  sobreNome: string,
  emailResponsavel?: string,
  urlFoto?: string,
  Frequencia?: Frequencia
}
