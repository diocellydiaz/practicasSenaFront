import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Producto } from "src/app/interfaces/producto.interface";

import { environment } from "src/environment/environment.prod";

@Injectable({
  providedIn: 'root'
})

export class ProductoService {

    constructor(private http: HttpClient) { }
    
  private baseUrl = `${environment.apiUrl}/api/productos`;
  

  getProductos(): Observable<Producto[]>{
    return this.http.get<Producto[]>(this.baseUrl);
  }  

  getProductoid(id: number): Observable<Producto>{
    return this.http.get<Producto>(`${this.baseUrl}/${id}`);
  }

  crearProducto(producto: Producto): Observable<Producto> { 
    return this.http.post<Producto>(this.baseUrl, producto);
  }

  actulizarProducto(id: number, producto: Producto): Observable<Producto>{
    return this.http.put<Producto>(`${this.baseUrl}/${id}`,producto);
  }

  eliminarProducto(id: number): Observable<void> { 
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}