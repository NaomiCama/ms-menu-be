import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; //
import { ComidaComponent } from './comida/comida.component';
import { ComidaVistaComponent } from './comida-vista/comida-vista.component';
import { MenuComponent } from './menu/menu.component';
const routes: Routes = [
  { path: 'comida', component: ComidaComponent },
  { path: 'vista', component: ComidaVistaComponent },
  { path: 'menu', component: MenuComponent },
  // Agrega otras rutas según sea necesario
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
