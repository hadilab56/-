// history.component.ts

import { Component } from '@angular/core';
import { Cart } from 'src/app/interfaces/cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {

  constructor(private cart: CartService) { }

  cartHistory: Array<Cart> = [];

  ngOnInit(): void {
    const userEmail = sessionStorage.getItem('email');
    if (userEmail) {
      this.cart.getCartByEmail(userEmail).subscribe({
        next: (res: any) => {
          console.log(res)
          this.cartHistory = res;
        }
      });
    }
  }

  calculateTotal(product: any): number {
    return product.price * product.quantity;
  }

  calculateCartTotal(cartItem: Cart): number {
    if (cartItem.product && cartItem.product.length > 0) {
      return cartItem.product.reduce((total, product) => total + this.calculateTotal(product), 0);
    } else {
      return 0; 
    }
  }
  
}
