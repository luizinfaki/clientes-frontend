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
    codigo: '',
    loja: 1,
    bairro: '',
    nome: '',
    nreduz: '',
    tipo: 'F',
    end: '',
    est: '',
    mun: '',
  };
  title = 'Inclusão de Cliente';

  constructor(
    private formularioClienteService: FormularioClienteService,
    private poNotification: PoNotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}

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
    this.cliente.codigo;
  }

  fields: Array<PoDynamicFormField> = [
    {
      property: 'id',
      label: 'Codigo',
      maxLength: 6,
    },
    {
      property: 'loja',
      label: 'Loja',
      maxLength: 2,
    },
    {
      property: 'nome',
      label: 'Nome',
      maxLength: 40,
    },
    {
      property: 'nreduz',
      label: 'Nome Fantasia',
      maxLength: 20,
    },
    {
      property: 'tipo',
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
      property: 'pessoa',
      label: 'Fisica/Jurid',
      options: [
        { label: 'Fisica', value: 'F' },
        { label: 'Juridica', value: 'J' },
      ],
    },
    {
      property: 'end',
      label: 'Endereço',
      maxLength: 50,
    },
    {
      property: 'bairro',
      label: 'Bairro',
      maxLength: 30
    },
    {
      property: 'mun',
      label: 'Municipio',
      maxLength: 30
    },
    {
      property: 'est',
      label: 'Estado',
      maxLength: 2
    },
  ];
}
