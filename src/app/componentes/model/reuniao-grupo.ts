import { Participante } from "./participante";

export interface ReuniaoGrupo {
  assunto?: string;
  data: Date;
  id?: string;
  observacao?: string;
  relato_supervisao?: string;
  total_participante: number;
  total_visitante: number;
  total_crianca?: number;
  participantes?: Participante[];
  visitantes?: String[];
  criancas?: String[];

}