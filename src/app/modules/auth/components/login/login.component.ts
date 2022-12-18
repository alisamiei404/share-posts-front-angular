import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service ';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  errors: any = null;
  message: any = null;
  btnLoading: boolean = false;
  loginSub!: Subscription;


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(4)])
    });
    
  }

  onSubmit(){
    if(!this.loginForm.valid){
      return;
    }

    this.btnLoading = true;
    
    this.loginSub = this.authService.login(this.loginForm.value).subscribe((res: any)=>{
        this.btnLoading = false;
        localStorage.setItem('user', JSON.stringify(res.user));
        this.loginForm.reset();
        this.authService.isLoggedIn = true;
        let u: any = localStorage.getItem('user');
        this.authService.user = JSON.parse(u);
        if(res.user.type == 'admin'){
            this.authService.isAdminIn = true;
            this.router.navigate(['/admin']);
        }else{
            this.router.navigate(['/']);
        }
        
        this.errors = null;
    }, error => {
        this.btnLoading = false;
        if(error.status === 422){
            if(error.error.errors){
            this.message = null;
            this.errors = error.error.errors;
            }else{
            this.errors = null;
            this.message = error.error.message;
        }
        
      }
    });
  }

  ngOnDestroy(): void {
    if(this.loginSub){
        this.loginSub.unsubscribe();
    }
  }

}
