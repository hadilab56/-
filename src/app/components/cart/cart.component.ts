import { Component } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { TabCartService } from 'src/app/services/tab-cart.service';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/interfaces/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  products: Array<Product> = [];

  constructor(private tabCart: TabCartService, private cartService: CartService) { }

  ngOnInit(): void {
    this.tabCart.cartItems$.subscribe((cartItems) => {
      this.products = cartItems;
    });
  }

  removeFromCart(index: number) {
    this.tabCart.removeFromCart(index);
  }

  confirmPurchase() {
    const date = new Date();
    const userEmail = sessionStorage.getItem('email');
    const cardData: Cart = { product: this.products, userEmail: userEmail, date: date };

    this.cartService.addCart(cardData as Cart).subscribe({
      next: (res) => {
        alert('Jawek Behi');
        this.products = [];
      }, error: (error) => {
        console.error('error', error);
      }
    });
  }

  isConfirmButtonDisabled(): boolean {
    return this.products.length === 0 || this.products.some(product => product.quantity === undefined || product.quantity <= 0);
  }
  
  
}
