import { Component } from '@angular/core';
import { Cart } from 'src/app/interfaces/cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.css']
})
export class CommandsComponent {
  constructor(private cart: CartService) { }

  cartHistory: Array<Cart> = [];

  ngOnInit(): void {
  this.cart.getCart().subscribe((res : any)=>{
    this.cartHistory = res ;
  })    
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
