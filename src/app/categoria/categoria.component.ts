import { Component, OnInit, DestroyRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Categoria } from '../interfaces/categoria.interface';
import { Producto } from '../interfaces/producto.interface';
import { CategoriaService } from '../services/categoria/categoria.service';
import { ProductoService } from '../services/producto/producto.service';
import { CartItem } from '../interfaces/cart.interface';
import { CartService } from '../services/cart-service.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css'],
})
export class CategoriaComponent implements OnInit {
  // una sola categoría
  categoria?: Categoria;

  // productos de esa categoría
  productos: Producto[] = [];
  

  constructor(
    private route: ActivatedRoute,
    private categoriaService: CategoriaService,
    private productoService: ProductoService,
    private cartService: CartService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const id = Number(params.get('id'));
        if (!id) {
          return;
        }

        this.cargarCategoria(id);
        this.cargarProductosPorCategoria(id);
      });
  }

  /** obtiene la categoría desde el backend */
  private cargarCategoria(id: number): void {
    this.categoriaService.getCategoria(id).subscribe({
      next: (cat) => (this.categoria = cat),
      error: (err) => console.error('Error cargando categoría', err),
    });
  }

  /** obtiene los productos de la categoría desde el backend */
  private cargarProductosPorCategoria(id: number): void {
    this.productoService.getProductosPorCategoria(id).subscribe({
      next: (prods) => (this.productos = prods),
      error: (err) =>
        console.error('Error cargando productos por categoría', err),
    });
  }

  /** trackBy para el *ngFor de productos */
  trackById(_: number, p: Producto): number | undefined {
    return (p as any).productoid ?? (p as any).id;
  }


  agregarAlCarrito(p: any) {
      const item: CartItem = {
        id: p.productoid, // o productoid / id según tu modelo
        title: p.nombre,
        price: Number(p.precio),
        image: p.nombrefoto, // o nombre_foto según tu JSON
        qty: 1,
      };
  
      this.cartService.add(item);
    }

}
