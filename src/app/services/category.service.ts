import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ApiResponse from '../interfaces/ApiResponse';
import Contact from '../interfaces/contact';
import { BASE_URL } from '../utils/consts';
import Category from '../interfaces/Category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private client: HttpClient) {}

  public AddCategory(name: string): Observable<ApiResponse> {
    const form = new FormData();

    form.append('name', name);

    return this.client.post<ApiResponse>(`${BASE_URL}/category/add.php`, form);
  }

  public getAll(): Observable<Category[]> {
    return this.client.get<Category[]>(`${BASE_URL}/category/get_all.php`);
  }
}
