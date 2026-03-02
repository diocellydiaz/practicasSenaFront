import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../interfaces/cart.interface';
import { CartService } from '../services/cart-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  titulo = 'Jabones Artesanales';

  count$: Observable<number> = this.cartService.count$;
  items$: Observable<CartItem[]> = this.cartService.items$;
  total$: Observable<number> = this.cartService.total$;

  constructor(private cartService: CartService) {}

  trackById = (_: number, it: CartItem) => it.id;

  increment(it: CartItem) {
    this.cartService.increment(it.id);
  }
  decrement(it: CartItem) {
    this.cartService.decrement(it.id);
  }
  remove(id: number) {
    this.cartService.remove(id);
  }
  clear() {
    this.cartService.clear();
  }

  getImg(it: any): string {
    const fallback = 'assets/Beneficios-del-jabon-artesanal.jpg';
    const img = (it?.image || it?.nombrefoto || '').trim();

    if (!img) return fallback;

    // si ya es URL pública
    if (img.startsWith('http://') || img.startsWith('https://')) return img;

    // si viene con backslashes de Windows, normaliza
    const clean = img.replaceAll('\\', '/');

    // si ya viene como assets/...
    if (clean.startsWith('assets/')) return clean;

    // si es solo el nombre del archivo
    return `assets/productos/${clean}`;
  }

  onImgError(ev: Event) {
    (ev.target as HTMLImageElement).src =
      'assets/Beneficios-del-jabon-artesanal.jpg';
  }
}
