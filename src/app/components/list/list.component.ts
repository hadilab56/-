import { Component, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  constructor(private product: ProductService) {}

  products: Array<Product> = [];

  message = '';

  @ViewChild('succesSwal')
  public readonly succesSwal!: SwalComponent;

  @ViewChild('failSwal')
  public readonly failSwal!: SwalComponent;

  ngOnInit(): void {
    this.fetchProducts();
  }

  private fetchProducts() {
    this.product.getAllProducts().subscribe({
      next: (res: any) => {
        console.log(res);
        console.log(sessionStorage.getItem('role'));

        this.products = res;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  deleteProduct(id: any) {
    this.product.deleteProduct(id).subscribe({
      next: async (res) => {
        this.message = res.message;
        await this.fireSuccess();
        this.fetchProducts();
      },
      error: async (error) => {
        this.message = error.message;
        console.error('error', error);
        await this.fireFail();
      },
    });
  }

  private async fireSuccess() {
    await this.succesSwal.fire();
  }

  private async fireFail() {
    await this.failSwal.fire();
  }
}
