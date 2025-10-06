import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';
import { PROMOS } from '../mocks/producto.mock';
import { CartService } from '../services/cart-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  promos: Producto[] = PROMOS;

  trackById(_: number, item: Producto) { return item.id; }

  constructor( private cart: CartService) {}

  addToCart(p: any) {
    this.cart.add({
      id: p.id,
      title: p.title,
      price: p.price || 0,
      image: p.image
    }, 1);
  }



  ngOnInit(): void {
    // Aquí podrías cargar datos dinámicamente si luego usas un servicio
  }
}
