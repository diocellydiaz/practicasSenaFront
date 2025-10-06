import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { CartItem } from '../interfaces/cart.interface';


@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly KEY = 'cart';
  private itemsSubject = new BehaviorSubject<CartItem[]>(this.load());
  items$ = this.itemsSubject.asObservable();

  count$ = this.items$.pipe(
    map(items => items.reduce((acc, i) => acc + i.qty, 0))
  );

  total$ = this.items$.pipe(
    map(items => items.reduce((acc, i) => acc + (i.qty * i.price), 0))
  );

  add(item: Omit<CartItem, 'qty'>, qty = 1) {
    const items = [...this.itemsSubject.value];
    const idx = items.findIndex(i => i.id === item.id);
    if (idx > -1) items[idx] = { ...items[idx], qty: items[idx].qty + qty };
    else items.push({ ...item, qty });
    this.persist(items);
  }

  increment(id: number) {
    this.updateQty(id, +1);
  }
  decrement(id: number) {
    this.updateQty(id, -1);
  }
  remove(id: number) {
    const items = this.itemsSubject.value.filter(i => i.id !== id);
    this.persist(items);
  }
  clear() {
    this.persist([]);
  }

  private updateQty(id: number, delta: number) {
    const items = this.itemsSubject.value.map(i =>
      i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i
    ).filter(i => i.qty > 0);
    this.persist(items);
  }

  private persist(items: CartItem[]) {
    localStorage.setItem(this.KEY, JSON.stringify(items));
    this.itemsSubject.next(items);
  }

  private load(): CartItem[] {
    try { return JSON.parse(localStorage.getItem(this.KEY) || '[]'); }
    catch { return []; }
  }
}