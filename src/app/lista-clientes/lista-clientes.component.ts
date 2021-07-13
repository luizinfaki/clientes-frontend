import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
import { ListaClientesService } from '../lista-clientes.service';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.scss']
})
export class ListaClientesComponent implements OnInit {

  listaClientes: Array<any> = new Array();
  colunasTabela: Array<any> = new Array();


  constructor(private listaClientesService: ListaClientesService,
              private router: Router,
              private poNotification: PoNotificationService) {  }

  ngOnInit(): void {
    this.updateListaClientes();
    this.colunasTabela = this.listaClientesService.getColunas();
  }

  updateListaClientes(): void {
    this.listaClientesService.getListaClientes().subscribe(response => {
      this.listaClientes = response.clients;
      console.log(this.listaClientes)
    });
  }

}
