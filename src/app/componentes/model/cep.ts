export interface Cep {
  cep: string,
  logradouro: string,
  complemento?: string,
  unidade?: string,
  bairro: string,
  localidade: string,
  uf: string,
  estado: string,
  regiao?: string,
  ibge?: string,
  ddd?: string,
  siafi?: string,
  numero?:string,
  pais: string;
}