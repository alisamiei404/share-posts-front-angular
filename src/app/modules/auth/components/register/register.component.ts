import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service ';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup;
  errors: any = null;
  btnLoading: boolean = false;
  registerSub!: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(4)])
    }); 
  }

  onSubmit(){
    if(!this.registerForm.valid){
      return;
    }

    this.btnLoading = true;
    
    this.registerSub = this.authService.register(this.registerForm.value).subscribe((res: any)=>{
        this.btnLoading = false;
        localStorage.setItem('user', JSON.stringify(res.user));
        this.registerForm.reset();
        this.authService.isLoggedIn = true;
        let u: any = localStorage.getItem('user');
        this.authService.user = JSON.parse(u);
        this.router.navigate(['/']);
        this.errors = null;
    }, error => {
        this.btnLoading = false;

        if(error.status === 422){
            this.errors = error.error.errors;
        }
    });
  }

  ngOnDestroy(): void {
    if(this.registerSub){
        this.registerSub.unsubscribe();
    }
  }

}
