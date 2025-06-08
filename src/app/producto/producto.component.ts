import { Component, OnInit } from '@angular/core';
import { Producto } from './producto';
import { ProductoService } from './producto.service';
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit{

  productos : Producto [] =[];

  constructor( private productoService : ProductoService,
    private activatedRoute : ActivatedRoute
   ){}

   ngOnInit(): void {
     
    this.activatedRoute.paramMap.subscribe(params => {
      this.productoService.getProductos().subscribe(
          productos => {
              this.productos = productos; // Asigna directamente a productos
          },
          error => {
              console.error('Error al obtener los productos:', error);
          }
      );
  });
   }


}
