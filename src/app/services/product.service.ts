import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private httpUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get<Array<Product>>(this.httpUrl);
  }

  addProduct(data : Product){
    return this.http.post(this.httpUrl, data);
  }

  deleteProduct(id : number){
    return this.http.delete(`${this.httpUrl}/${id}`);
  }

  getProductByid(id:number){
    return this.http.get(`${this.httpUrl}/${id}`);
    }

  editProduct(id:number , data:Product){
    return this.http.put(`${this.httpUrl}/${id}`,data);
  }
}
