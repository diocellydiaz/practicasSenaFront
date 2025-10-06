import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ProductoApi } from '../interfaces/producto-api.interface';
import { Producto } from '../interfaces/producto.interface'; // UI

@Injectable({ providedIn: 'root' })
export class ProductoService {
  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return this.http.get<ProductoApi[]>('/api/productos').pipe(
      map(items => items.map(this.mapApiToUI))
    );
  }

  private mapApiToUI(p: ProductoApi): Producto {
    return {
      id: p.id_producto,
      title: p.nombre,
      price: p.precio,
      image: p.image ?? 'assets/Beneficios-del-jabon-artesanal.jpg',
      stock: p.stock,
      subtitle: p.descripcion,
      badge: this.mapBadge(p.categoria),
      date: p.fecha_fabricacion ? new Date(p.fecha_fabricacion) : undefined,
      link: `/producto/${p.id_producto}`,
    };
  }

  private mapBadge(categoria?: string): 'Nuevo' | 'Oferta' | 'Top' | undefined {
    switch (categoria?.toLowerCase()) {
      case 'nuevo':
      case 'nuevo producto':
        return 'Nuevo';
      case 'oferta':
      case 'descuento':
        return 'Oferta';
      case 'top':
      case 'destacado':
        return 'Top';
      default:
        return undefined;
    }
  }
}