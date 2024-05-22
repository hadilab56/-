import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/interfaces/cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.css']
})
export class CommandsComponent implements OnInit {
  cartHistory: Array<Cart> = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getCart().subscribe((res: any) => {
      this.cartHistory = res;
      // Initialize the editing property for each product
      this.cartHistory.forEach(cartItem => {
        if (cartItem.product) {
          cartItem.product.forEach(product => {
            product.editing = false;
          });
        }
      });
    });
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

  printCommands(): void {
    window.print();
  }

  editProduct(product: any): void {
    product.editing = true;
  }

  saveProduct(product: any): void {
    product.editing = false;
    // Save the updated quantity to the server or local state
    // Example: this.cart.updateProduct(product).subscribe();
  }
  deleteCommand(cartItem: Cart): void {
    const index = this.cartHistory.indexOf(cartItem);
    if (cartItem.id !== undefined) {
      this.cartService.deleteCart(cartItem.id).subscribe(() => {
        // Handle successful deletion
        this.cartHistory.splice(index, 1); // Remove the item from the cartHistory array
      }, error => {
        console.error('Error deleting cart item', error);
      });
    }
}
}
