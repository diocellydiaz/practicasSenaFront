import { Injectable } from '@angular/core';
import { map, Observable, catchError , throwError, tap  } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
//import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Producto } from './producto';

@Injectable({
    providedIn: 'root'
  })
  export class ProductoService{

    private urlEndPoint: string =  'http://localhost:8083/api/productos'

    private httpHeaders = new HttpHeaders({'Content-type': 'application/json'})
    constructor(private http: HttpClient,
    private router: Router
  ) { }

  getProductos(): Observable<Producto[]> {
    const token = localStorage.getItem('token'); // Cambia esto según cómo guardes el token

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Producto[]>(this.urlEndPoint, { headers });
}


  }