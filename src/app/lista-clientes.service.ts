import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PoTableColumn } from '@po-ui/ng-components';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListaClientesService {

  ApiRest = 'http://localhost:8090/rest/APICLIENTES';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Basic ` + btoa('admin:1'),
    })
  };

  // const httpOptions = {
  // headers: headers_object
  // };


  // metodo responsavel p buscar e listar clientes
  getListaClientes(): Observable<any> {
    return this.http.get(this.ApiRest, this.httpOptions);
  }

  getColunas(): Array<PoTableColumn> {
    return [
      { property: 'id', label: 'Código'},
      { property: 'loja', label: 'Loja' },
      { property: 'nome', label: 'Nome' },
      { property: 'tipo', label: 'Fisica/Juridica' },
      { property: 'endereco', label: 'Endereço' },
    ];
  }
}