import { Component, OnInit, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Producto } from '../interfaces/producto.interface';
import { ProductoService } from '../services/producto/producto.service';
import { CartService } from '../services/cart-service.service';
import { CartItem } from '../interfaces/cart.interface';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
})
export class ProductoComponent implements OnInit {
  productos: Producto[] = [];

  constructor(
    private productoService: ProductoService,
    private cartService: CartService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  private cargarProductos(): void {
    this.productoService
      .getProductos()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (items) => {
          console.log('Productos desde backend:', items);
          this.productos = items;
        },
        error: (err) => console.error('Error al obtener los productos:', err),
      });
  }

  trackById(_: number, p: Producto) {
    // para soportar productos de BD (productoid) y mocks (id)
    return p.productoid ?? p.id;
  }

  editarProducto(p: Producto): void {
    const id = p.productoid ?? p.id;
    console.log('Editar producto', id, p);
    // futuro: this.router.navigate(['/productos/form', id]);
  }

  eliminarProducto(p: Producto): void {
    const id = p.productoid ?? p.id;
    if (!id) {
      console.warn('Producto sin id, no se puede eliminar');
      return;
    }

    if (!confirm('¿Seguro que deseas eliminar este producto?')) {
      return;
    }

    this.productoService
      .eliminarProducto(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.cargarProductos(),
        error: (err: any) => console.error('Error al eliminar', err),
      });

    console.log('Aquí iría la llamada para eliminar el producto con id:', id);
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

  incrementarItem(item: CartItem): void {
    this.cartService.increment(item.id);
  }

  disminuirItem(item: CartItem): void {
    this.cartService.decrement(item.id);
  }
}
