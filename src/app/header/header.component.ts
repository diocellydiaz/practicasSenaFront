import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../interfaces/cart.interface';
import { CartService } from '../services/cart-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  titulo = 'Jabones Artesanales';


  count$: Observable<number> = this.cartService.count$;
  items$: Observable<CartItem[]> = this.cartService.items$;
  total$: Observable<number> = this.cartService.total$;

  constructor(private cartService: CartService) {}

  trackById = (_: number, it: CartItem) => it.id;

  increment(it: CartItem) { this.cartService.increment(it.id); }
  decrement(it: CartItem) { this.cartService.decrement(it.id); }
  remove(id: number) { this.cartService.remove(id); }
  clear() { this.cartService.clear(); }

}
