export class Cliente {
  public codigo: string;
  public loja: number;
  public nome: string;
  public nreduz: string;
  public tipo: string;
  public pessoa: string;
  public end: string;
  public bairro: string;
  public est: string;
  public mun: string;

  constructor() {
    this.codigo = '';
    this.loja = 1;
    this.nome = '';
    this.nreduz = '';
    this.tipo = 'F';
    this.pessoa = 'F';
    this.end = '';
    this.bairro = '';
    this.mun = '';
    this.est = '';
  }
}
