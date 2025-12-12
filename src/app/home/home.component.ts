import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Producto } from '../interfaces/producto.interface';
import { Categoria } from '../interfaces/categoria.interface';

import { ProductoService } from '../services/producto/producto.service';
import { CategoriaService } from '../services/categoria/categoria.service';
import { CartItem } from '../interfaces/cart.interface';
import { CartService } from '../services/cart-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // categorías desde el backend
  categorias: Categoria[] = [];

  // productos destacados
  productosDestacados: Producto[] = [];
 

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private cartService: CartService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarProductosDestacados();
  }

  private cargarCategorias(): void {
    this.categoriaService
      .getCategorias()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (cats) => {
          console.log('Categorías desde backend', cats);
          this.categorias = cats;
        },
        error: (err) => {
          console.error('Error cargando categorías', err);
          this.categorias = [];
        },
      });
  }

  private cargarProductosDestacados(): void {
    this.productoService
      .getProductos()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (items) => {
          console.log('Productos desde backend', items);
          // toma los primeros 4 como destacados
          this.productosDestacados = items.slice(0, 4);
        },
        error: (err) => {
          console.error('Error cargando productos destacados', err);
          this.productosDestacados = [];
        },
      });
  }

  trackByProductoId(_: number, p: Producto) {
    return (p as any).productoid ?? (p as any).id;
  }

  trackByCategoriaId(_: number, c: Categoria) {
    return c.id;
  }

  agregarAlCarrito(p: any) {
  const item: CartItem = {
    id: p.productoid,          // o productoid / id según tu modelo
    title: p.nombre,
    price: Number(p.precio),
    image: p.nombrefoto,       // o nombre_foto según tu JSON
    qty: 1
  };

  this.cartService.add(item);
  }



}
