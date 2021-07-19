import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoNotificationService, PoTableAction } from '@po-ui/ng-components';
import { ListaClientesService } from '../lista-clientes.service';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.scss'],
})
export class ListaClientesComponent implements OnInit {
  listaClientes: Array<any> = new Array();
  colunasTabela: Array<any> = new Array();

  actions: Array<PoTableAction> = [
    {
      action: this.updateCliente.bind(this),
      icon: 'po-icon-edit',
      label: 'Editar Cliente',
    },
    {
      action: this.deleteCliente.bind(this),
      icon: 'po-icon-delete',
      label: 'Remover Cliente',
    },
  ];

  updateCliente(row: any) {
    console.log('editar');
    const clienteId = row.cod;
  }

  deleteCliente(row: any) {
    console.log('remover');
    const clienteId = row.cod;

    this.listaClientesService.deleteCliente(clienteId).subscribe(
      () => {
        this.updateListaClientes();
        this.poNotification.success('removido com sucesso');
      },
      (err) => {
        this.updateListaClientes;
        this.poNotification.error(err);
        console.log(err)
      }
    );

    // #TODO#
  }

  constructor(
    private listaClientesService: ListaClientesService,
    private router: Router,
    private poNotification: PoNotificationService
  ) {}

  ngOnInit(): void {
    this.updateListaClientes();
    this.colunasTabela = this.listaClientesService.getColunas();
  }

  updateListaClientes(): void {
    this.listaClientesService.getListaClientes().subscribe((response) => {
      this.listaClientes = response.clients;
    });
  }
}
