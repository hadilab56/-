import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import Category from 'src/app/interfaces/Category';
import { Product } from 'src/app/interfaces/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  categories: Category[] = [];

  @ViewChild('succesSwal')
  public readonly succesSwal!: SwalComponent;

  @ViewChild('failSwal')
  public readonly failSwal!: SwalComponent;

  constructor(
    private product: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe({
      next: (v) => {
        this.categories = v;
      },
    });
  }

  message = '';
  addProduct = new FormGroup({
    categorie: new FormControl('', [Validators.required]),
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(/^[A-Z][a-zA-Z]*(?:\s+[A-Z][a-zA-Z]*)*$/),
    ]),
    image: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
  });
  addData() {
    const postData = { ...this.addProduct.value };
    this.product.addProduct(postData as Product).subscribe({
      next: async (res) => {
        this.message = res.message;
        this.addProduct.reset({});
        this.fireSuccess();
      },
      error: async (err) => {
        this.message = err.message;
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
