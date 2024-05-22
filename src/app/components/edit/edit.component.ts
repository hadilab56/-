import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Category from 'src/app/interfaces/Category';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent {
  categories: Category[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: ActivatedRoute
  ) {}

  message = '';

  @ViewChild('succesSwal')
  public readonly succesSwal!: SwalComponent;

  @ViewChild('failSwal')
  public readonly failSwal!: SwalComponent;

  editProduct = new FormGroup({
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

  ngOnInit(): void {
    this.categoryService.getAll().subscribe({
      next: (v) => {
        this.categories = v;
      },
      error: (err) => {
        console.error(err);
      },
    });

    this.productService
      .getProductByid(this.router.snapshot.params['id'])
      .subscribe((res: any) => {
        this.editProduct = new FormGroup({
          categorie: new FormControl(res['id_c']),
          title: new FormControl(res['title']),
          image: new FormControl(res['image']),
          description: new FormControl(res['description']),
          price: new FormControl(res['price']),
        });
      });
  }
  editData() {
    this.productService
      .editProduct(this.router.snapshot.params['id'], {
        ...(this.editProduct.value as Product),
        id_c: this.editProduct.value['categorie'],
      })
      .subscribe({
        next: async (res) => {
          this.message = res.message;
          await this.fireSuccess();
        },
        error: async (err) => {
          this.message = err.message;
          console.error(err);
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
