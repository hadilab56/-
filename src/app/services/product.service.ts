import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product';
import { BASE_URL } from '../utils/consts';
import ApiResponse from '../interfaces/ApiResponse';
import { ɵINTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private httpUrl = `${BASE_URL}/products`;

  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get<Array<Product>>(`${this.httpUrl}/get_all.php`);
  }

  addProduct(data: any) {
    const form = new FormData();

    form.append('description', data.description!);
    form.append('title', data.title!);
    form.append('price', `${data.price}`);
    form.append('image', data.image!);
    form.append('id_c', data['id_c']);

    return this.http.post<ApiResponse>(`${this.httpUrl}/add_product.php`, form);
  }

  deleteProduct(id: number) {
    const body = new FormData();
    body.append('id', `${id}`);
    return this.http.post<ApiResponse>(`${this.httpUrl}/remove.php`, body);
  }

  getProductByid(id: number) {
    return this.http.get(`${this.httpUrl}/get_one.php?id=${id}`);
  }

  editProduct(id: number, data: any) {
    const form = new FormData();

    form.append('id', `${id}`);
    form.append('description', data.description!);
    form.append('title', data.title!);
    form.append('price', `${data.price}`);
    form.append('image', data.image);
    form.append('id_c', data['id_c']);

    return this.http.post<ApiResponse>(`${this.httpUrl}/update.php`, form);
  }
}
