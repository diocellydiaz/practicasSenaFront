import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor( private http: HttpClient ) { }

  private url = 'http://localhost:8080/api/clientes';
  
}
