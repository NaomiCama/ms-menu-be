// comida.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comida } from './comida';

@Injectable({
  providedIn: 'root'
})
export class ComidaService {
  private apiUrl = 'http://localhost:9090/comida';

  constructor(private http: HttpClient) {}

  getAllComida(): Observable<Comida[]> {
    return this.http.get<Comida[]>(`${this.apiUrl}/findAll`);
  }
  //gpt
  getComidasByEstado(estado: string): Observable<Comida[]> {
    return this.http.get<Comida[]>(`${this.apiUrl}/findByEstado/${estado}`);
  }

  getComidasLocalStorage(): Comida[] {
    const comidasStr = localStorage.getItem('comidas');
    return comidasStr ? JSON.parse(comidasStr) : [];
  }

  setComidasLocalStorage(comidas: Comida[]): void {
    localStorage.setItem('comidas', JSON.stringify(comidas));
  }

  eliminarComida(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/eliminar`, {});
  }

  restaurarComida(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/restaurar`, {});
  }

  editarComida(id: number, comida: Comida): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, comida);
  }

  crearComida(comida: Comida): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}`, comida);
  }
}
