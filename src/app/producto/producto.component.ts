import { Component, OnInit, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Producto } from '../interfaces/producto.interface';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
editarProducto(_t15: Producto) {
throw new Error('Method not implemented.');
}
eliminarProducto(arg0: number) {
throw new Error('Method not implemented.');
}
  productos: Producto[] = [];

  constructor(
    private productoService: ProductoService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.productoService.getProductos()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: items => this.productos = items,
        error: err => console.error('Error al obtener los productos:', err)
      });
  }

  trackById(_: number, it: Producto) { return it.id; }
}
