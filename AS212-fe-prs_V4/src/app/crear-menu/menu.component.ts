import { Component, OnInit } from '@angular/core';
import { Menu } from '../menu';
import { MenuService } from '../menu.service';
import { FormGroup, FormControl } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  filtroForm: FormGroup;
  menus: Menu[];
  nuevoMenu: Menu = { menuid: null!, nombre: '', estado: 'A' };
  editandoId: number | null = null;
  filtroEstado: string = 'A';

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.filtroForm = new FormGroup({
      filtro: new FormControl('todos')
    });

    this.getMenusByEstado(this.filtroEstado);
  }

  getMenusByEstado(estado: string): void {
    this.menuService.getMenusByEstado(estado)
      .subscribe(data => {
        this.menus = data.filter(menu => estado === 'A' || (estado === 'I' && menu.estado === 'I'));
      });
  }

  cambiarFiltroEstado(): void {
    this.getMenusByEstado(this.filtroEstado);
  }
  
  eliminarMenu(id: number): void {
    this.menuService.eliminarMenu(id)
      .subscribe(() => {
        this.menus = this.menus.filter(menu => menu.menuid !== id);
      }, error => console.error('Error al eliminar menú:', error));
  }
  
  restaurarMenu(id: number): void {
    this.menuService.restaurarMenu(id)
      .subscribe(
        () => this.actualizarMenu(id, 'A'),
        error => console.error('Error al restaurar menú:', error)
      );
  }

  editarMenu(id: number): void {
    this.editandoId = id;
    const menuEditando = this.menus.find(menu => menu.menuid === id);
    if (menuEditando) {
      this.nuevoMenu = { 
        menuid: menuEditando.menuid,
        nombre: menuEditando.nombre,
        estado: menuEditando.estado
      };
    }
  }

  guardarEdicion(): void {
    if (!this.nuevoMenu.nombre) {
      console.log('Por favor, completa el campo de Nombre.');
      return;
    }

    if (this.editandoId !== null) {
      this.menuService.editarMenu(this.editandoId, this.nuevoMenu)
        .pipe(
          switchMap(() => this.menuService.getMenusByEstado(this.filtroEstado))
        )
        .subscribe(
          (data) => {
            console.log('Menú actualizado correctamente.');
            this.editandoId = null;
            this.nuevoMenu = { menuid: null!, nombre: '', estado: 'A' };
            this.menus = data;
          },
          error => console.error('Error al actualizar menú:', error)
        );
    } else {
      this.menuService.crearMenu(this.nuevoMenu)
        .pipe(
          switchMap(() => this.menuService.getMenusByEstado(this.filtroEstado))
        )
        .subscribe(
          (data) => {
            console.log('Menú creado correctamente.');
            this.nuevoMenu = { menuid: null!, nombre: '', estado: 'A' };
            this.menus = data;
          },
          error => console.error('Error al crear nuevo menú:', error)
        );
    }
  } 

  private actualizarMenu(id: number, estado: string): void {
    const menuIndex = this.menus.findIndex(menu => menu.menuid === id);
    if (menuIndex !== -1) {
      this.menus[menuIndex].estado = estado;
    }
  }

  validarLetras(event: any) {
    const pattern = /[A-Za-z\s]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  cambiarFiltro(estado: boolean): void {
    this.filtroEstado = estado ? 'A' : 'I';
    this.getMenusByEstado(this.filtroEstado);
  }

  /*mostrarBoton(estadoMenu: string): boolean {
    if (this.filtroEstado === 'A') {
      return estadoMenu === 'A';
    } else {
      return estadoMenu === 'I';
    } */

    //refactorizar el código
    mostrarBoton(estadoMenu: string): boolean {
      return this.filtroEstado === 'A' ? estadoMenu === 'A' : estadoMenu === 'I';
    }
    
}
