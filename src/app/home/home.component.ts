import { Component, OnInit, ChangeDetectionStrategy, DestroyRef } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';
import { CartService } from '../services/cart-service.service';
import { ProductoService } from '../services/producto/producto.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  productosDestacados: Producto[] = [];

  constructor(
    private productoService: ProductoService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  private cargarProductos(): void {
    this.productoService.getProductos()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          console.log('Productos desde backend:', data);
          this.productosDestacados = data;
        },
        error: (err) => {
          console.error('Error cargando productos:', err);
          this.productosDestacados = [];
        }
      });
  }
}
