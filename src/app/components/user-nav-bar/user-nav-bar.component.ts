// user-nav-bar.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-nav-bar',
  templateUrl: './user-nav-bar.component.html',
  styleUrls: ['./user-nav-bar.component.css']
})
export class UserNavBarComponent {
  constructor(public router: Router) {}

  email = sessionStorage.getItem('email');

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
