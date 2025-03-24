import { Pessoa } from "../Pessoa";
import { Cep } from "./cep";

export interface Grupo {
  id?: string;
  nome: string;
  dataAbertura: Date;
  diaSemana: string;
  perfil: string;
  horario: string;
  categorias: string[];
  primeiro_lider: string;
  segundo_lider: string;
  terceiro_lider: string;
  quarto_lider: string;
  dadoEndereco: Cep;
  pessoas?: Pessoa[];

}