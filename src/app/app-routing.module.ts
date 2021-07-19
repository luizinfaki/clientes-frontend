import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioClienteComponent } from './formulario-cliente/formulario-cliente.component';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';

const routes: Routes = [
  { path: '', component: ListaClientesComponent },
  { path: 'clientes',      component: ListaClientesComponent }, // get
  { path: 'cadastro',      component: FormularioClienteComponent }, // post
  { path: 'cadastro/:id', component: FormularioClienteComponent } // put
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
