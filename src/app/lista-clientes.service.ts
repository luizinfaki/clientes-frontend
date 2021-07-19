import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PoTableColumn } from '@po-ui/ng-components';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListaClientesService {
  ApiRest = 'http://localhost:8090/rest/APICLIENTES';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Basic ` + btoa('admin:1'),
    }),
  };

  // metodo responsavel p buscar e listar clientes
  getListaClientes(): Observable<any> {
    return this.http.get(this.ApiRest, this.httpOptions);
  }

  deleteCliente(id: string) {
    return this.http.delete(this.ApiRest + `?ID=${id}`, this.httpOptions);
  }

  getColunas(): Array<PoTableColumn> {
    return [
      { property: 'cod', label: 'Código' },
      { property: 'loja', label: 'Loja' },
      { property: 'nome', label: 'Nome' },
      {
        property: 'tipo',
        label: 'Fisica/Juridica',
        type: 'label', //part3 add
        labels: [
          { value: 'F', color: 'color-08', label: 'Física' },
          { value: 'J', color: 'color-12', label: 'Juridica' },
        ],
      },
      { property: 'end', label: 'Endereço' },
    ];
  }
}
