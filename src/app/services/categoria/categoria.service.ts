import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { environment } from 'src/environment/environment.prod';

@Injectable({ providedIn: 'root' })
export class CategoriaService {

  private baseUrl = `${environment.apiUrl}/api/categorias`;

  constructor(private http: HttpClient) {}

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.baseUrl);
  }

  getCategoria(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.baseUrl}/${id}`);
  }
}
