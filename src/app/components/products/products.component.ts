import { Component } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { TabCartService } from 'src/app/services/tab-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  constructor(private productService: ProductService, private tabCart: TabCartService) {}

  mursProducts: Array<Product> = [];
  plafondProducts: Array<Product> = [];
  eclairageProducts: Array<Product> = [];

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      (res: Array<Product>) => {
          res.forEach((p)=>{
            switch(p.category){
              case "Plafond":{
                this.plafondProducts.push(p);
                break;
              }
              case "Murs":{
                this.mursProducts.push(p);
                break;
              }
              case "Eclairage":{
                this.eclairageProducts.push(p);
                break;
              }
            }
          })
      },
      (error) => {
        console.error();
      }
    );
  }

  addToCart(product: Product) {
    this.tabCart.addToCart(product);
  }

  isInCart(product: Product): boolean {
    return this.tabCart.isInCart(product);
  }
}

