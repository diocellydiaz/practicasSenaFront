import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  DestroyRef,
} from '@angular/core';
import { Producto } from '../interfaces/producto.interface';
import { ProductoService } from '../services/producto/producto.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  productosDestacados: Producto[] = [];


  constructor(
    private productoService: ProductoService,
    private destroyRef: DestroyRef,
    private router: Router
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
          this.productosDestacados = items;
        },
        error: (err) => console.error('Error al obtener los productos:', err),
      });
  }

  trackById(_: number, p: Producto) {
    // para soportar productos de BD (productoid) y mocks (id)
    return p.productoid ?? p.id;
  }

  irACatalogo(): void{
    this.router.navigate(['/productos']);
  }

  irACategoria(categoria: string): void{
    this.router.navigate(['/productos'], {
      queryParams: {categoria}
    })
  }


}
