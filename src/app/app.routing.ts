import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnvioComponent } from './envio/envio.component';
import { ProductoComponent } from './producto/producto.component';
import { ClienteComponent } from './cliente/cliente.component';
import {PedidoComponent} from './pedido/pedido.component';
import {ProveedorComponent} from './proveedor/proveedor.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { QuienesSomosComponent } from './quienes-somos/quienes-somos.component';

const routes: Routes = [
  {
    path: '',
    component: ClienteComponent
  },
  {
    path: 'app-producto',
    component: ProductoComponent
  },
  {
    path: 'clientes',
    component: ClienteComponent

  },
  {
    path: 'iniciar',
    component: PedidoComponent
  },
  {
    path: 'Envio',
    component: EnvioComponent
  },
  {
    path: 'Proveedor',
    component: ProveedorComponent
  },
  { path: 'login', 
    component: LoginComponent },
  { path: 'register', 
    component: RegisterComponent },
  {
    path:'app-quienes-somos',
    component: QuienesSomosComponent
  } , 

  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


