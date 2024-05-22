import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../utils/consts';
import ApiResponse from '../interfaces/ApiResponse';
import Contact from '../interfaces/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactUsService {
  constructor(private client: HttpClient) {}

  public SendMessage(body: Contact): Observable<ApiResponse> {
    const form = new FormData();

    form.append('email', body.email);
    form.append('name', body.name);
    form.append('msg', body.msg);

    return this.client.post<ApiResponse>(`${BASE_URL}/contact/index.php`, form);
  }
}
