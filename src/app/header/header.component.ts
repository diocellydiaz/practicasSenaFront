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


  count$: Observable<number> = this.cart.count$;
  items$: Observable<CartItem[]> = this.cart.items$;
  total$: Observable<number> = this.cart.total$;

  constructor(private cart: CartService) {}

  trackById = (_: number, it: CartItem) => it.id;

  increment(it: CartItem) { this.cart.increment(it.id); }
  decrement(it: CartItem) { this.cart.decrement(it.id); }
  remove(id: number) { this.cart.remove(id); }
  clear() { this.cart.clear(); }

}
