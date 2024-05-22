import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  registerForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    address: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.minLength(8)]],
    password: ['', [Validators.required]],
  });

  submitDetails() {
    const postData = { ...this.registerForm.value };
    this.auth.registerUser(postData as User).subscribe({
      next: (res) => {
        this.router.navigate(['login']);
      },
      error: (error) => {
        console.error('something went wrong!', error);
      },
    });
  }
}
