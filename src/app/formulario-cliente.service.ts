import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class FormularioClienteService {

  ApiRest = 'http://localhost:8090/rest/APICLIENTES';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Basic ` + btoa('admin:1'),
    })
  };

  incluirCliente(body: string) {
    return this.http.post(this.ApiRest, body, this.httpOptions);
  }
}
