import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';

const routes: Routes = [
  { path: '', component: ListaClientesComponent },
  { path: 'clientes', component: ListaClientesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
