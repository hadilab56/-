import { Component } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private fb: FormBuilder , private auth : AuthService , private router : Router) {} ;
  message : boolean = false ;
  loginForm = this.fb.group({
    email:['' , [Validators.required , Validators.email , Validators.minLength(5)]],
    password:['' , [Validators.required]]
  });
 

  loginUser(){
    const {email , password } = this.loginForm.value;
    this.auth.getUserByemail(email as string).subscribe((res:any)=>{
      if(res.length > 0 && res[0].password === password){
        sessionStorage.setItem('email' , email as string)
        if(res[0].role ==='user'){
          sessionStorage.setItem('role' , 'user')
        this.router.navigate(['/products']) ;
        }else{
          sessionStorage.setItem('role' , 'admin');
          this.router.navigate(['/list']) ;
        }  
      }
      else{
      this.message= true ;
      }
    })
  }



  removeMessage(){
    this.message = false ;
  }
}
