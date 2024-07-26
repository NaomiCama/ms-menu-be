import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ComidaVista } from '../app/comida-vista';
@Injectable({
  providedIn: 'root'
})
export class VistaMenuService {
  
  private apiUrl = 'http://localhost:9090/api/vista-menu';

  constructor(private http: HttpClient) {}

  getAllComidaMenu(): Observable<ComidaVista[]> {
    return this.http.get<ComidaVista[]>(`${this.apiUrl}/all`);
  }
}
