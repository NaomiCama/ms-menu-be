import { Component, OnInit } from '@angular/core';
import { Comida } from '../comida';
import { ComidaService } from '../comida.service';
import { FormGroup, FormControl } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-comida',
  templateUrl: './comida.component.html',
  styleUrls: ['./comida.component.css']
})
export class ComidaComponent implements OnInit {
  filtroForm: FormGroup;
  comidas: Comida[];
  nuevaComida: Comida = { idcomida: null!, nombrec: '', categoria: '', estado: 'A' };
  editandoId: number | null = null;
  filtroEstado: string = 'A';

  constructor(private comidaService: ComidaService) {}

  ngOnInit(): void {
    this.filtroForm = new FormGroup({
      filtro: new FormControl('todos')
    });

    this.getComidasByEstado(this.filtroEstado);
  }

  getComidasByEstado(estado: string): void {
    this.comidaService.getComidasByEstado(estado)
      .subscribe(data => {
        // Filtrar las comidas según el estado y excluyendo las que tienen estado "Inactivo"
        this.comidas = data.filter(comida => estado === 'A' || (estado === 'I' && comida.estado === 'I'));
      });
  }
  

  cambiarFiltroEstado(): void {
    this.getComidasByEstado(this.filtroEstado);
  }
  
  eliminarComida(id: number): void {
    this.comidaService.eliminarComida(id)
      .subscribe(() => {
        this.comidas = this.comidas.filter(comida => comida.idcomida !== id);
      }, error => console.error('Error al eliminar comida:', error));
  }
  

  restaurarComida(id: number): void {
    this.comidaService.restaurarComida(id)
      .subscribe(
        () => this.actualizarComida(id, 'A'),
        error => console.error('Error al restaurar comida:', error)
      );
  }

  editarComida(id: number): void {
    this.editandoId = id;
    const comidaEditando = this.comidas.find(comida => comida.idcomida === id);
    if (comidaEditando) {
      this.nuevaComida = { 
        idcomida: comidaEditando.idcomida,
        nombrec: comidaEditando.nombrec,
        categoria: comidaEditando.categoria,
        estado: comidaEditando.estado
      };
    }
  }

  guardarEdicion(): void {
    if (!this.nuevaComida.nombrec || !this.nuevaComida.categoria) {
      console.log('Por favor, completa los campos de Nombre y Categoría.');
      return;
    }

    if (this.editandoId !== null) {
      this.comidaService.editarComida(this.editandoId, this.nuevaComida)
        .pipe(
          switchMap(() => this.comidaService.getComidasByEstado(this.filtroEstado))
        )
        .subscribe(
          (data) => {
            console.log('Comida actualizada correctamente.');
            this.editandoId = null;
            this.nuevaComida = { idcomida: null!, nombrec: '', categoria: '', estado: 'A' };
            this.comidas = data;
          },
          error => console.error('Error al actualizar comida:', error)
        );
    } else {
      this.comidaService.crearComida(this.nuevaComida)
        .pipe(
          switchMap(() => this.comidaService.getComidasByEstado(this.filtroEstado))
        )
        .subscribe(
          (data) => {
            console.log('Comida creada correctamente.');
            this.nuevaComida = { idcomida: null!, nombrec: '', categoria: '', estado: 'A' };
            this.comidas = data;
          },
          error => console.error('Error al crear nueva comida:', error)
        );
    }
  }

  private actualizarComida(id: number, estado: string): void {
    const comidaIndex = this.comidas.findIndex(comida => comida.idcomida === id);
    if (comidaIndex !== -1) {
      this.comidas[comidaIndex].estado = estado;
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
    this.getComidasByEstado(this.filtroEstado);
  }

  mostrarBoton(estadoComida: string): boolean {
    if (this.filtroEstado === 'A') {
      return estadoComida === 'A';
    } else {
      return estadoComida === 'I';
    }
  }
}
