import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProductoComponent } from './producto/producto.component';
import { ClienteComponent } from './cliente/cliente.component';
import { PedidoComponent } from './pedido/pedido.component';
import { EnvioComponent } from './envio/envio.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { QuienesSomosComponent } from './quienes-somos/quienes-somos.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' }, // Home

  // Rutas “planas” en minúscula (coinciden con tus routerLink)
  { path: '/producto', component: ProductoComponent },
  { path: '/clientes', component: ClienteComponent },
  { path: '/pedidos', component: PedidoComponent },      // antes 'iniciar'
  { path: '/envio', component: EnvioComponent },         // antes 'Envio'
  { path: '/proveedores', component: ProveedorComponent },// antes 'Proveedor'
  { path: '/login', component: LoginComponent },
  { path: '/register', component: RegisterComponent },
  { path: '/quienes-somos', component: QuienesSomosComponent }, // antes 'app-quienes-somos'

  // Wildcard: cualquier ruta desconocida → Home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled', // vuelve arriba al navegar
    anchorScrolling: 'enabled'            // permite #anclas
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
