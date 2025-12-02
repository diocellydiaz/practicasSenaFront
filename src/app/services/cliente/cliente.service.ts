import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { environment } from 'src/environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor( private http: HttpClient ) { }

  private baseUrl = `${environment.apiUrl}/api/clientes`;

   // GET /api/clientes
  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.baseUrl);
  }

  // GET /api/clientes/{id}
  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.baseUrl}/${id}`);
  }

  // POST /api/clientes
  crearCliente(cliente: Cliente): Observable<any> {
    // el backend devuelve Map<String,Object> (mensaje, cliente, errors...)
    return this.http.post<any>(this.baseUrl, cliente);
  }

  // PUT /api/clientes/{id}
  actualizarCliente(id: number, cliente: Cliente): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, cliente);
  }

  // DELETE /api/clientes/{id}
  eliminarCliente(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
  
  // POST /api/clientes/login
  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(`${this.baseUrl}/login`, body);
  }

}
