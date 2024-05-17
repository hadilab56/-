import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabCartService {
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  addToCart(product: Product) {
    const currentCartItems = this.cartItemsSubject.value;
    const updatedCartItems = [...currentCartItems, product];
    this.cartItemsSubject.next(updatedCartItems);
  }

  isInCart(product: Product): boolean {
    const currentCartItems = this.cartItemsSubject.value;
    return currentCartItems.some(item => item.id === product.id);
}

removeFromCart(index: number) {
  const currentCartItems = this.cartItemsSubject.value;
  const updatedCartItems = [...currentCartItems];
  updatedCartItems.splice(index, 1);
  this.cartItemsSubject.next(updatedCartItems);
}

clearCart() {
  this.cartItemsSubject.next([]);
}
}
