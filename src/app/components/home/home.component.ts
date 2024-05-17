import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  email: string | null;

  constructor(public router: Router) {
    this.email = null;
  }

  ngOnInit(): void {
    this.email = sessionStorage.getItem('email');
  }

  logOut(): void {
    sessionStorage.removeItem('email');
    this.email = null;
    this.router.navigate(['/login']);
  }
}
