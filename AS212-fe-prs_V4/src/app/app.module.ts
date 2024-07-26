import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ComidaComponent } from './crear-comida/comida.component';
import { FormsModule } from '@angular/forms';
import { ComidaVistaComponent } from './comida-vista/comida-vista.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './crear-menu/menu.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    ComidaComponent,
    ComidaVistaComponent,
    MenuComponent,

  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
