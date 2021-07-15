import { Component, OnInit } from '@angular/core';
import { Cliente } from '../model/cliente.model';
import { FormularioClienteService } from '../formulario-cliente.service';
import {
  PoDynamicFormField,
  PoNotificationService,
} from '@po-ui/ng-components';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-formulario-cliente',
  templateUrl: './formulario-cliente.component.html',
  styleUrls: ['./formulario-cliente.component.scss'],
})
export class FormularioClienteComponent implements OnInit {
  //fields: Array&amp;lt;PoDynamicFormField&amp;gt; = []; //campos "dinamicos" para usar no formulário
  cliente: Cliente = new Cliente(); //model de um fornecedor
  dadosCliente = {
    a1_cod: '',
    a1_loja: '01',
    a1_bairro: '',
    a1_nome: '',
    a1_nreduz: '',
    a1_tipo: 'F',
    a1_pessoa: 'F',
    a1_end: '',
    a1_est: '',
    a1_mun: '',
  };
  title = 'Inclusão de Cliente';

  constructor(
    private formularioClienteService: FormularioClienteService,
    private poNotification: PoNotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dadosCliente = {
      a1_cod: '',
      a1_loja: '01',
      a1_bairro: '',
      a1_nome: '',
      a1_nreduz: '',
      a1_tipo: 'F',
      a1_pessoa: 'F',
      a1_end: '',
      a1_est: '',
      a1_mun: '',
    };
  }

  inserirCliente(): void {
    this.getClienteForm();
    this.formularioClienteService
      .postCliente(JSON.stringify(this.cliente))
      .pipe(first())
      .subscribe(
        () => {
          this.poNotification.success('Cliente inserido com sucesso.');
          this.router.navigate(['/clientes']); // redireciona p lista de clientes
        },
        (err) => {
          // caso de erro
          console.log(err);
          console.log(err.error);
          console.log(err.error.errorMessage);
          this.poNotification.error('Falha ao inserir cliente.');
        }
      );
  }
  getClienteForm(): void {
    this.cliente.a1_cod = this.dadosCliente.a1_cod;
    this.cliente.a1_loja = this.dadosCliente.a1_loja;
    this.cliente.a1_nome = this.dadosCliente.a1_nome;
    this.cliente.a1_nreduz = this.dadosCliente.a1_nreduz;
    this.cliente.a1_tipo = this.dadosCliente.a1_tipo;
    this.cliente.a1_pessoa = this.dadosCliente.a1_pessoa;
    this.cliente.a1_end = this.dadosCliente.a1_end;
    this.cliente.a1_bairro = this.dadosCliente.a1_bairro;
    this.cliente.a1_mun = this.dadosCliente.a1_mun;
    this.cliente.a1_est = this.dadosCliente.a1_est;
  }

  fields: Array<PoDynamicFormField> = [
    {
      property: 'a1_cod',
      label: 'Codigo',
      maxLength: 6,
    },
    {
      property: 'a1_loja',
      label: 'Loja',
      maxLength: 2,
    },
    {
      property: 'a1_nome',
      label: 'Nome',
      maxLength: 40,
    },
    {
      property: 'a1_nreduz',
      label: 'Nome Fantasia',
      maxLength: 20,
    },
    {
      property: 'a1_tipo',
      label: 'Tipo',
      options: [
        { label: 'Cons. Final', value: 'F' },
        { label: 'Produtor Rural', value: 'L' },
        { label: 'Revendedor', value: 'R' },
        { label: 'Solidario', value: 'S' },
        { label: 'Exportação', value: 'X' },
      ],
    },
    {
      property: 'a1_pessoa',
      label: 'Fisica/Jurid',
      options: [
        { label: 'Fisica', value: 'F' },
        { label: 'Juridica', value: 'J' },
      ],
    },
    {
      property: 'a1_end',
      label: 'Endereço',
      maxLength: 50,
    },
    {
      property: 'a1_bairro',
      label: 'Bairro',
      maxLength: 30,
    },
    {
      property: 'a1_mun',
      label: 'Municipio',
      maxLength: 30,
    },
    {
      property: 'a1_est',
      label: 'Estado',
      maxLength: 2,
    },
  ];
}
