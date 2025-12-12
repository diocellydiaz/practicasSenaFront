import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { CartItem } from '../interfaces/cart.interface';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly KEY = 'cart';  // nombre clave en localStorage

  private itemsSubject = new BehaviorSubject<CartItem[]>(this.load());  // inicializa el estado
  items$ = this.itemsSubject.asObservable();  // observable para la vista

  // total de unidades (sumatoria de qty)
  count$ = this.items$.pipe(
    map(items => items.reduce((acc, i) => acc + i.qty, 0))
  );

  // total en dinero
  total$ = this.items$.pipe(
    map(items => items.reduce((acc, i) => acc + i.price * i.qty, 0))
  );

  /** Devuelve el estado actual (sync) */
  get snapshot(): CartItem[] {
    return this.itemsSubject.value;
  }

  /** Agrega 1 unidad (o qty) al carrito; si existe, suma qty */
  add(item: CartItem): void {
    const items = [...this.itemsSubject.value];
    const idx = items.findIndex(i => i.id === item.id);

    if (idx >= 0) {
      items[idx] = { ...items[idx], qty: items[idx].qty + (item.qty ?? 1) };
    } else {
      items.push({ ...item, qty: item.qty ?? 1 });
    }

    this.persist(items);
  }

  /** Elimina un item completamente */
  remove(id: number): void {
    const items = this.itemsSubject.value.filter(i => i.id !== id);
    this.persist(items);
  }

  /** Vacía el carrito */
  clear(): void {
    this.persist([]);
  }

  /** Cambia la cantidad exacta */
  setQty(id: number, qty: number): void {
    const q = Math.max(1, qty);
    const items = this.itemsSubject.value.map(i =>
      i.id === id ? { ...i, qty: q } : i
    );
    this.persist(items);
  }

  /** Incrementa cantidad */
  increment(id: number): void {
    const items = [...this.itemsSubject.value];
    const item = items.find(i => i.id === id);
    
    if (item) {
      item.qty += 1;
      this.persist(items);
    }
  }

  /** Disminuye cantidad */
  decrement(id: number): void {
    const items = [...this.itemsSubject.value];
    const item = items.find(i => i.id === id);

    if (item && item.qty > 1) {
      item.qty -= 1;
      this.persist(items);
    }
  }

  private persist(items: CartItem[]) {
    localStorage.setItem(this.KEY, JSON.stringify(items));
    this.itemsSubject.next(items);
  }

  private load(): CartItem[] {
    try {
      return JSON.parse(localStorage.getItem(this.KEY) || '[]');
    } catch {
      return [];
    }
  }
}
