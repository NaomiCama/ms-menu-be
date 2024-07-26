import { Component, OnInit  } from '@angular/core';
import { VistaMenuService } from '../vista-menu.service';
import { ComidaVista } from '../comida-vista';
@Component({
  selector: 'app-comida-vista',
  templateUrl: './comida-vista.component.html',
  styleUrls: ['./comida-vista.component.css']
})

export class ComidaVistaComponent implements OnInit{
  comidasMenus: ComidaVista[];
  selectedMenu: string;
  selectedComidas: string[] = [];
  savedData: { menu: string, comidas: string[] }[] = [];

  constructor(private VistaMenuService: VistaMenuService) {}

  ngOnInit(): void {
    this.VistaMenuService.getAllComidaMenu().subscribe(data => {
      this.comidasMenus = data;
    });
  }
  
  onSave(): void {
    // Envía los datos seleccionados al backend para guardarlos
    console.log('Menú seleccionado:', this.selectedMenu);
    console.log('Comidas seleccionadas:', this.selectedComidas);
    // Lógica para enviar al backend y guardar los datos
    // Implementa aquí la lógica para enviar los datos seleccionados al backend y guardarlos
    // Después de guardar, agregamos los datos a la lista de guardados para mostrarlos en la tabla
    this.savedData.push({ menu: this.selectedMenu, comidas: this.selectedComidas });
    // Limpiar selecciones
    this.selectedMenu = '';
    this.selectedComidas = [];
  }
}
