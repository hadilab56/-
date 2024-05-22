import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../interfaces/cart';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:3000/carts';

  addCart(data: Cart) {
    return this.http.post(this.url, data);
  }

  getCartByEmail(email: string): Observable<any> {
    return this.http.get(`${this.url}?userEmail=${email}`);
  }

  getCart(): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.url);
  }

  deleteCart(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
