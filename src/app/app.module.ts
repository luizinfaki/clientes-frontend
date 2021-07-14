import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoButtonModule, PoDynamicModule, PoModule, PoNotificationModule } from '@po-ui/ng-components';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { RouterModule } from '@angular/router';

import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { FormularioClienteComponent } from './formulario-cliente/formulario-cliente.component';

@NgModule({
  declarations: [
    AppComponent, ListaClientesComponent, FormularioClienteComponent
  ],
  imports: [
    PoNotificationModule, PoDynamicModule, PoButtonModule, PoTemplatesModule, 
    BrowserModule,
    AppRoutingModule,
    PoModule,
    RouterModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
