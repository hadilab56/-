import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://localhost:3000/users'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getClients(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`);
  }

  getClientById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  addClient(User: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}`, User);
  }

  updateClient(User: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${User.id}`, User);
  }

  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
