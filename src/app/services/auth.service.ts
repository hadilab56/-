import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }
  

  httpUrl = "http://localhost:3000/users" ;

  registerUser(userData: User) {
    const data = { ...userData, role: 'user' };
    return this.http.post(this.httpUrl, data);
  }

  getUserByemail(email: string): Observable<User | User[]> {
    return this.http.get<User | User[]>(`${this.httpUrl}?email=${email}`);
  }
  
  

}
