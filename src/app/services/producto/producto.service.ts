import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Producto } from "src/app/producto/producto";
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
    return this.http.get<Producto>(`${this.baseUrl}/${id}`)
  }

}