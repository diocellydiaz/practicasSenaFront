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
import { Categoria } from '../interfaces/categoria.interface';
import { CategoriaService } from '../services/categoria/categoria.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  productosDestacados: Producto[] = [];
  categorias: Categoria[] = [];


  constructor(
    private productoService: ProductoService,
    private destroyRef: DestroyRef,
    private categoriaService: CategoriaService,
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

  private cargarCategorias(): void {
    this.categoriaService.getCategorias()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: cats => {
          console.log('Categorías desde backend', cats);
          this.categorias = cats;
        },
        error: err => console.error('Error cargando categorías', err)
      });
  }


}
